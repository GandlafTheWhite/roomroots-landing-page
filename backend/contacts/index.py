import json
import os
import psycopg2
import requests
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
        
        name = body.get('name', '')
        contact = body.get('contact', '')
        preferences = body.get('preferences', {})
        message_text = body.get('message', '')
        
        if not contact:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Contact is required'})
            }
        
        dsn = os.environ.get('DATABASE_URL')
        if dsn:
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute(
                """
                INSERT INTO contact_requests (name, contact, preferences, message)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (name, contact, json.dumps(preferences), message_text)
            )
            result = cur.fetchone()
            request_id = result['id']
            
            conn.commit()
            cur.close()
            conn.close()
        else:
            request_id = None
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if bot_token and chat_id:
            mood_emoji = {'calm': '🍃', 'vibrant': '✨', 'minimal': '⚪'}.get(preferences.get('mood', ''), '')
            location_emoji = {'home': '🏠', 'office': '💼', 'gift': '🎁', 'cafe': '☕'}.get(preferences.get('location', ''), '')
            
            telegram_message = f"""🌿 Новая заявка #{request_id or 'N/A'}

👤 Имя: {name or 'не указано'}
📱 Контакт: {contact}

Предпочтения:
{mood_emoji} Настроение: {preferences.get('mood', '—')}
{location_emoji} Куда: {preferences.get('location', '—')}
📏 Размер: {preferences.get('size', '—')}
🎨 Стиль: {preferences.get('style', '—')}

💬 Сообщение: {message_text or '—'}"""
            
            telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
            telegram_response = requests.post(
                telegram_url,
                json={'chat_id': chat_id, 'text': telegram_message, 'parse_mode': 'HTML'},
                timeout=10
            )
            
            if not telegram_response.ok:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Failed to send Telegram notification', 'id': request_id})
                }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'id': request_id})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
