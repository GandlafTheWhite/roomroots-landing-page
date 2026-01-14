import json
import os
import random
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        preferences = body.get('preferences', {})
        
        mood = preferences.get('mood')
        location = preferences.get('location')
        size = preferences.get('size')
        style = preferences.get('style')
        
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database connection not configured'})
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT 
                id, name, description, image_url, mood, location, size, style, 
                available, price_range,
                (CASE WHEN mood = %s THEN 3 ELSE 1 END *
                 CASE WHEN location = %s THEN 3 ELSE 1 END *
                 CASE WHEN size = %s THEN 2 ELSE 1 END *
                 CASE WHEN style = %s THEN 2 ELSE 1 END) as weight
            FROM products
            WHERE available = true
            ORDER BY weight DESC, RANDOM()
            LIMIT 1
        """
        
        cur.execute(query, (mood, location, size, style))
        product = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if not product:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No products found'})
            }
        
        result = dict(product)
        result.pop('weight', None)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(result)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
