export function  formatVersionName(versionName: string): string {
    const versionMap: { [key: string]: string } = {
      'red': 'Pokémon Red',
      'blue': 'Pokémon Blue',
      'yellow': 'Pokémon Yellow',
      'gold': 'Pokémon Gold',
      'silver': 'Pokémon Silver',
      'crystal': 'Pokémon Crystal',
      'ruby': 'Pokémon Ruby',
      'sapphire': 'Pokémon Sapphire',
      'emerald': 'Pokémon Emerald',
      'firered': 'Pokémon FireRed',
      'leafgreen': 'Pokémon LeafGreen',
      'diamond': 'Pokémon Diamond',
      'pearl': 'Pokémon Pearl',
      'platinum': 'Pokémon Platinum',
      'heartgold': 'Pokémon HeartGold',
      'soulsilver': 'Pokémon SoulSilver',
      'black': 'Pokémon Black',
      'white': 'Pokémon White',
      'black-2': 'Pokémon Black 2',
      'white-2': 'Pokémon White 2',
      'x': 'Pokémon X',
      'y': 'Pokémon Y',
      'omega-ruby': 'Pokémon Omega Ruby',
      'alpha-sapphire': 'Pokémon Alpha Sapphire',
      'sun': 'Pokémon Sun',
      'moon': 'Pokémon Moon',
      'ultra-sun': 'Pokémon Ultra Sun',
      'ultra-moon': 'Pokémon Ultra Moon',
      'lets-go-pikachu': 'Pokémon Let\'s Go Pikachu',
      'lets-go-eevee': 'Pokémon Let\'s Go Eevee',
      'sword': 'Pokémon Sword',
      'shield': 'Pokémon Shield',
      'legends-arceus': 'Pokémon Legends: Arceus',
      'scarlet': 'Pokémon Scarlet',
      'violet': 'Pokémon Violet'
    };

    return versionMap[versionName] || versionName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }