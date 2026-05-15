import json

def get_short_role(item):
    rol = item.get('rol_principal', '')
    area = item.get('area', '')
    
    if not rol or len(rol) < 15:
        return area if area else 'Profesional'
    
    if '.' in rol:
        short = rol.split('.')[0].strip()
    else:
        short = rol.strip()
    
    if len(short) > 80:
        short = short[:77] + '...'
    
    return short

with open('talento_humano.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, item in enumerate(data, 1):
    item['rol_resumido'] = get_short_role(item)
    print(f"{i}. {item['rol_resumido'][:70]}")

with open('talento_humano.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✓ Actualizado: {len(data)} roles resumidos")
