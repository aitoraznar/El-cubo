const aRoom = (id, name, synonyms, description, events) =>
  ({ id, name, synonyms, description, events });
const anItem = (id, name, synonyms, description, location, pickable, pickingResponse, isWeapon, damage) =>
  ({ id, name, synonyms, description, location, pickable, pickingResponse, isWeapon, damage });
const anUsage = (items, response, onlyOnce) =>
  ({ items, response, onlyOnce });
const anUnlockingAction = (response, lock) => ({ isUnlockingAction: true, response, lock });
const aPickingAction = (response, itemId) => ({ isPickingAction: true, response, itemId });
const aConditionalResponse = conditions => ({ isConditional: true, conditions });
const aLockedDestination = (roomId, lock) => ({ isLockedDestination: true, roomId, lock });
const aCondDesc = (condition, description) => ({ conditional: true, condition, description });
const aCondDescUsage = (consumesObjects, condition, description) =>
  ({ conditional: true, consumesObjects, condition, description });
const aEnemy = (id, name, synonyms, description, location, life, damage, canMove, onlyAttackOnce) =>
    ({ id, name, synonyms, description, location, life, damage, canMove, onlyAttackOnce });
const theEndingScene = description => ({ isEndingScene: true, description });
const isPickable = true;
const useOnlyOnce = true;
const consumesTheObjects = true;
const isOpeneable = true;
const isWeapon = true;

exports.data = {
  sentences: {
    'game-intro': 'Tommy, te acabas de despertar y apareces en una habitación sin ventanas iluminada de rojo. Te sientes un poco aturdido aún, pero eso no te impide darte cuenta que estás encadenado. No sabes qué haces ahí ni por qué. Te preguntas cómo podrías salir vivo de esta situación...',
    help: 'Puedes hacer las siguientes acciones: Mirar, Abrir, Usar, Ir, Coger, Inventario, Atacar y Defenderse. Puedes moverte por dirección (adelante) o por nombre ¿Qué quieres hacer a continuación?',
    'help-no-screen': 'Puedes hacer las siguientes acciones: Mirar, Abrir, Usar, Ir, Coger, Inventario, Atacar y Defenderse. ¿Qué quieres hacer a continuación?',
    fallback: 'No te entiendo. Di Ayuda si necesitas ayuda. ¿Has revisado bien el cubo?',
    destinations: 'Desde aquí puedo ir a: {destinations}. ¿A dónde quiero ir?',
    'destination-unreachable': 'No puedo llegar al {destination} desde aquí...',
    'destination-unknown': 'No sé ir al {destination} desde aquí.',
    'destination-no-one': 'Todas las escotillas están cerradas, prueba a abrir una primero.',
    'map-alt': 'Mapa con: sala de mandos, pasillo norte, comedor, pasillo central, biblioteca, pasillo sur y habitaciones',
    'remaining-time': 'Tic tac! Te quedan {minutes} minutos y {seconds} segundos para salir antes de que todo explote.',
    'ending-remaining-time': 'Quedaban {timeLeft}',
    'item-not-in-location': 'No encuentro o veo ese objeto. ¿Qué quieres que haga?',
    'item-notseen': 'No veo el objeto {name} por aquí. ¿Qué quieres que haga?',
    'item-unknown': 'No te he entendido qué quieres que me lleve. ¿Qué quieres que haga?',
    'item-pickedup': 'Me llevo el objeto {name} conmigo. ¿Qué quieres que haga?',
    'item-notpickable': 'No puedo llevarme el objeto {name} conmigo. ¿Qué quieres que haga?',
    'item-alreadyinventory': 'Ya llevo conmigo el objeto {name}. ¿Qué quieres que haga?',
    'item-alreadypicked': 'Ya me llevé el objeto {name}. ¿Qué quieres que haga?',
    'item-notopeneable': 'No puedo abrir {name}, prueba con una escotilla. ¿Has visto las que tienes en tu cubo?',
    'hatch-notseen': 'No veo esa escotilla por aquí. ¿Seguro que esa escotilla está en este cubo?',
    'hatch-locked': 'Esta escotilla está bloqueada, no se puede abrir.',
    'hatch-opened': 'La {name} está abierta.',
    'use-noarg': 'Especifíca que objeto u objetos quieres que use. Por ejemplo: usar objeto, o usar objeto con objeto. ¿Qué hago?',
    'use-cant': 'No puedo usar el objeto {item}. ¿Qué quieres que haga?',
    'use-canttwo': 'No puedo usar los objetos {item1} y {item2} entre sí. ¿Qué quieres que haga?',
    'use-onlyonce': 'Ya utilicé ese objeto. No puedo usarlo otra vez. ¿Qué quieres que haga?',
    'use-onlyonce-two': 'Ya utilicé esos objetos. No puedo usarlos otra vez. ¿Qué quieres que haga?',
    inventory: 'Llevo los siguientes objetos conmigo: {items}. ¿Qué quieres que haga?',
    'inventory-nothing': 'No llevo nada encima. ¿Qué quieres que haga?',
    bye: 'Coger el camino rápido no te librará de mi venganza, nos volveremos a ver... Adiós.',
    'end-timeover': 'Se te ha acabado el tiempo, hora de morir. BOOOOOOOOOOOM',
    'changed-language': 'Ok, a partir de ahora hablaré en {lang}. ¿Qué quieres que haga?',
    'changed-language-unknown': 'No sé hablar el idioma {lang}. Solo sé hablar inglés y español. ¿Qué quieres hacer?',
    'no-target-to-attack': 'No hay nada a lo que golpear...',
    'cant-attack-to-target': 'No puedo golpear a {enemy}',
    'cant-attack-dead-target': 'No puedo goldearlo si ya está muerto',
    'hit-target': 'Alcanzas a {target} con {weapon}, le quitas {points} de vida.',
    'hit-target-dead': 'Tras golpear {target} con {weapon}, lo derrotas.',
  },
  init: {
    life: 100,
    roomId: 'cuboA',
    inventory: ['dice', 'boots'],
    picked: ['dice', 'boots'],
    unlocked: ['cuboA-unlocked']
  },
  rooms: [
    aRoom('cuboA', 'Cubo A', ['habitación A', 'estancia A', 'cuba'], 'La habitación tiene forma de cubo y está iluminada de rojo. Tiene 3 escotillas, una arriba, una delante y otra a tu derecha. En el centro de la habitación ves dos cuerdas.', {
      'exit': 'Muahahahaha, te mereces todo lo malo que te pase. Estás encerrado debido a las malas acciones que has cometido durante tu vida, solo la redención te dará la libertad. Vigila tus dónde pisas.'
    }),
    aRoom('cuboB', 'Cubo B', ['habitación B', 'estancia B'], 'Cubo 2 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboC', 'Cubo C', ['habitación C', 'estancia C', 'cuba'], 'Cubo 3 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboD', 'Cubo D', ['habitación D', 'estancia D'], [
      aCondDesc('!picked:comedor-cartera', 'No he cogido... Cubo 2 descripción. ¿qué haré a continuación?'),
      aCondDesc('default', 'Cubo 4 descripción. ¿qué haré a continuación?'),
    ], {}),
    aRoom('cuboE', 'Cubo E', ['habitación E', 'estancia E'], 'Cubo 5 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboF', 'Cubo F', ['habitación F', 'estancia F'], 'Cubo 6 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboG', 'Cubo G', ['habitación G', 'estancia G'], 'Cubo 7 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboH', 'Cubo H', ['habitación H', 'estancia H'], 'Cubo 8 descripción. ¿qué haré a continuación?', {}),
  ],
  map: {
    'cuboA': [aLockedDestination('cuboC', 'cuboC-unlocked')],
    'cuboB': [aLockedDestination('cuboD', 'cuboD-unlocked'), aLockedDestination('cuboF', 'cuboF-unlocked')],
    'cuboC': ['cuboA', aLockedDestination('cuboD', 'cuboD-unlocked'), aLockedDestination('cuboG', 'cuboG-unlocked')],
    'cuboD': [aLockedDestination('cuboB', 'cuboB-unlocked'), aLockedDestination('cuboC', 'cuboC-unlocked'), aLockedDestination('cuboH', 'cuboH-unlocked')],
    'cuboE': [],
    'cuboF': [aLockedDestination('cuboB', 'cuboB-unlocked'), aLockedDestination('cuboH', 'cuboH-unlocked')],
    'cuboG': [aLockedDestination('cuboC', 'cuboC-unlocked'), aLockedDestination('cuboH', 'cuboH-unlocked')],
    'cuboH': [aLockedDestination('cuboD', 'cuboD-unlocked'), aLockedDestination('cuboF', 'cuboF-unlocked'), aLockedDestination('cuboG', 'cuboG-unlocked')]
  },
  items: [
    anItem('fist', 'Puño', ['puño', 'puños', 'manos'], 'Son mis manos curtidas', 'cuboA', !isPickable, null, isWeapon, 10),
    anItem('dice', 'Dado de 6 caras', ['dado', 'dados', 'dado de 6 caras', 'dado de 6 lados'], 'Es un dado de 6 caras, color blanco y negro.', null, isPickable),
    anItem('boots', 'Botas', ['botas', 'zapatos', 'calzado'], 'Son las botas de marca Coronel Tapioca de cuero marrón wue llevo puestas.', null, isPickable),
    anItem('cuboA-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboA', !isPickable),
    anItem('cuboB-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboB', !isPickable),
    anItem('cuboC-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboC', !isPickable),
    anItem('cuboD-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboD', !isPickable),
    anItem('cuboE-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboE', !isPickable),
    anItem('cuboF-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboF', !isPickable),
    anItem('cuboG-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboG', !isPickable),
    anItem('cuboH-escotillas', 'Escotillas', ['escotillas'], 'Son 6 escotillas, están situadas justo en el centro del lateral. Parecen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboH', !isPickable),

      //Cubo A
    anItem('cuboA-escotilla-superior', 'Escotilla superior', ['escotilla superior', 'escotilla de arriba', 'escotilla del tejado', 'escotilla del techo'], [
        aCondDesc('opened:cuboA-escotilla-superior', 'Desde aquí puedo ver un cubo con luz blanca, es el cubo C.'),
        aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del techo. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared y el techo que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
        aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla del techo.'),
    ], 'cuboA', !isPickable, isOpeneable),
    anItem('cuboA-escotilla-inferior', 'Escotilla inferior', ['escotilla inferior', 'escotilla de abajo', 'escotilla debajo'], 'Es la escotilla de debajo.',
      'cuboA', !isPickable, isOpeneable),
    anItem('cuboA-escotilla-izquierda', 'Escotilla izquierda', ['escotilla izquierda', 'escotilla de la izquierda'], 'Es la escotilla de la izquierda.',
      'cuboA', !isPickable, isOpeneable),
    anItem('cuboA-escotilla-derecha', 'Escotilla derecha', ['escotilla derecha', 'escotilla de la derecha'], [
        aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del lateral. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
        aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla de la derecha'),
    ], 'cuboA', !isPickable, isOpeneable),
    anItem('cuboA-escotilla-frontal', 'Escotilla frontal', ['escotilla delantera', 'escotilla de enfrente', 'escotilla de delante'], [
      aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del techo. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
      aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla de enfrente'),
    ], 'cuboA', !isPickable, isOpeneable),
    anItem('cuboA-escotilla-trasera', 'Escotilla trasera', ['escotilla trasera', 'escotilla de atrás'], 'Es la escotilla trasera.',
      'cuboA', !isPickable, isOpeneable),

    anItem('cuboA-cuerdas', 'Cuerdas', ['cuerdas', 'las cuerdas'], 'Ves dos cuerdas, una la izquierda y otra a la derecha que se dirigen hasta la esquina opuesta a la tuya. Ves que las cuerdas están a tu alcance.', 'cuboA', !isPickable),
    anItem('cuboA-cuerda-izq', 'Cuerda izquierda', ['cuerda izquierda', 'cuerda de la izquierda', 'cordón izquierdo'], 'Ves que la cuerda va hasta el fondo y sube por la pared a través de guías, continúa por el techo y termina casi encima de ti. Aprecias que tiene algo brillante en el extremo pero no llegas a saber qué es. Podrías tirar de la cuerda, ¿tiras de ella?', 'cuboA', !isPickable),
    anItem('cuboA-cuerda-dcha', 'Cuerda derecha', ['cuerda derecha', 'cuerda de la derecha', 'cordón derecha'], 'Ves que la cuerda va hasta el fondo y sube por la pared a través de guías, continúa por el techo y se desvía ligeramente hacia la derecha acabando en una esquina del techo, cuelga una caja pequeña cuyo contenido no llegas a ver. Podrías tirar de la cuerda, ¿tiras de ella?', 'cuboA', !isPickable),
    anItem('cuboA-objeto-brillante', 'Objeto brillante', ['algo brillante', 'objeto brillante', 'cosa brillante'], [
        aCondDesc('!unlocked:cuboA-objeto-brillante-unlocked', '¿Qué objeto brillante?'),
        aCondDesc('unlocked:cuboA-objeto-brillante-unlocked', 'Es un objeto no muy grande, te cabría en la mano, es de un brillante color metálico rojizo. No llegas a discernir qué es.'),
    ], 'cuboA', !isPickable),
    anItem('cuboA-pequena-caja', 'caja pequeña', ['caja pequeña', 'caja colgante', 'caja que cuelga'], [
        aCondDesc('!unlocked:cuboA-pequena-caja-unlocked', '¿Qué caja colgante?'),
        aCondDesc('unlocked:cuboA-pequena-caja-unlocked', 'Es una caja de un tamaño pequeño, parece una caja de madera. Aprecias que se mueve un poco.'),
    ], 'cuboA', !isPickable),
    anItem('cuboA-llaves', 'Llave de cadenas', ['llave', 'llaves'], [
      aCondDesc('!unlocked:cuboA-llaves-unlocked', '¿Qué llave?'),
      aCondDesc('unlocked:cuboA-llaves-unlocked', 'La llave podría entrar en la cerradura de las cadenas.'),
    ], 'cuboA', isPickable),
    anItem('cuboA-cadenas', 'Cadenas', ['cadena', 'cadenas', 'grillete', 'grilletes'], [
      aCondDesc('picked:cuboA-llaves', 'Igual podría usar la llave con las cadenas, ¿no?'),
      aCondDesc('else', 'Es una cadena robusta anclada a la pared y a tu pierna derecha. El extremo atado a tu pierna tiene una cerradura, crees que podrías abrirla con una llave o unas ganzúas.'),
    ], 'cuboA', !isPickable),
    anItem('cuboA-rat', 'Rata', ['ratón', 'rata de cloaca', 'sagutxu'], [
        aCondDesc('!unlocked:cuboA-rata-unlocked', '¿Qué rata?'),
        aCondDesc('unlocked:cuboA-rata-muerta-unlocked', 'La jodida rata está muerta por fin.'),
        aCondDesc('unlocked:cuboA-rata-unlocked', '¡Es una mugrosa rata que me está mordiendo!'),
    ], 'cuboA', isPickable),

      //Cubo B
    anItem('cuboB-crowbar', 'Palanca', ['barra métalica', 'palanca'], 'Es una palanca métalica que me podría servir para defenderme o hacer fuerza en alguna escotilla.', 'cuboB', isPickable, null, isWeapon, 20),

      //CuboC
    anItem('cuboC-escotilla-superior', 'Escotilla superior', ['escotilla delantera', 'escotilla de enfrente', 'escotilla de delante'], 'Es la escotilla superior.',
        'cuboC', !isPickable, isOpeneable),
    anItem('cuboC-escotilla-inferior', 'Escotilla inferior', ['escotilla inferior', 'escotilla de abajo', 'escotilla debajo'], 'Es la escotilla inferior.',
        'cuboC', !isPickable, isOpeneable),
    anItem('cuboC-escotilla-izquierda', 'Escotilla izquierda', ['escotilla izquierda', 'escotilla de la izquierda'], 'Es la escotilla de la izquierda.',
      'cuboC', !isPickable, isOpeneable),
    anItem('cuboC-escotilla-derecha', 'Escotilla derecha', ['escotilla derecha', 'escotilla de la derecha'], 'Es la escotilla derecha.',
        'cuboC', !isPickable, isOpeneable),
    anItem('cuboC-escotilla-frontal', 'Escotilla frontal', ['escotilla delantera', 'escotilla de enfrente', 'escotilla de delante'], 'Es la escotilla de enfrente.',
      'cuboC', !isPickable, isOpeneable),
    anItem('cuboC-escotilla-trasera', 'Escotilla trasera', ['escotilla trasera', 'escotilla de atrás'], 'Es la escotilla trasera.',
      'cuboC', !isPickable, isOpeneable),
  ],
  usages: [
    anUsage('dice', [
      'Tiras el dado y sacas un 1.',
      'Tiras el dado y sacas un 1 de nuevo. La misma tirada de antes...',
      'Tiras el dado y sacas un 1 de nuevo. Esto ya es sospechoso...',
      'Tiras el dado y sacas un 1 de nuevo. Te das cuenta que siempre sacas el mismo número y el 6 siempre está debajo.',
    ], !useOnlyOnce),

    anUsage('cuboA-cuerda-izq', [
      anUnlockingAction('Tiras de la cuerda, se escucha perfectamente cómo la cuerda recorre las guías hasta que al final escuchas un “click” y cae un objeto casi encima de ti. Ves que es una llave.', 'cuboA-llaves-unlocked')
    ], useOnlyOnce),
    anUsage('cuboA-cuerda-dcha', [
        'Tiras de la cuerda se escucha perfectamente cómo la cuerda recorre las guías hasta que al final escuchas un “click” y la caja cae desde la esquina. De la caja sale una rata que se dirige hacia ti.'
    ], useOnlyOnce),
    anUsage('cuboA-llaves', [
        '¿Esta llave me liberará de las cadenas? Será mejor probar con las cadenas, ¡no?'
    ], !useOnlyOnce),
    anUsage(['cuboA-llaves', 'cuboA-cadenas'], [
      aConditionalResponse([
          aCondDescUsage(!consumesTheObjects, '!picked:cuboA-llaves', 'El extremo atado a tu pierna tiene una cerradura, crees que podrías abrirla con una llave o unas ganzúas.'),
          aCondDescUsage(consumesTheObjects, 'picked:cuboA-llaves', anUnlockingAction('Bien! me he librado de las cadenas.', 'cuboA-cadenas-unlocked')),
      ]),
    ], useOnlyOnce),

    anUsage('cuboA-escotilla-superior', [
      aConditionalResponse([
        //aCondDescUsage(false, '!unlocked:locked', 'Esta escotilla está bloqueada, no se puede abrir.'),
        aCondDescUsage(false, '!unlocked:cuboA-cadenas-unlocked', 'Las cadenas me impiden llegar a abrir la escotilla. Tendré que quitarme primero las cadenas...'),
        aCondDescUsage(false, 'unlocked:cuboA-cadenas-unlocked', anUnlockingAction('Abres la escotilla, desde aquí puedo ver un cubo con luz blanca, es el cubo C.', 'cuboC-unlocked')),
      ])
    ], !useOnlyOnce),
    anUsage('cuboA-escotilla-inferior', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboA-escotilla-izquierda', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboA-escotilla-derecha', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboA-escotilla-frontal', [
      aConditionalResponse([
          aCondDescUsage(false, '!unlocked:cuboA-cadenas-unlocked', 'Las cadenas me impiden llegar a abrir la escotilla. Tendré que quitarme primero las cadenas...'),
          aCondDescUsage(false, '!unlocked:locked', 'Esta escotilla está bloqueada, no se puede abrir.'),
      ])
    ], !useOnlyOnce),
    anUsage('cuboA-escotilla-trasera', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),


    anUsage('cuboC-escotilla-superior', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboC-escotilla-inferior', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboC-escotilla-izquierda', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboC-escotilla-derecha', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),
    anUsage('cuboC-escotilla-frontal', [
        anUnlockingAction('Desde aquí puedo ver un cubo con luz blanca, es el cubo G.', 'cuboG-unlocked'),
    ], !useOnlyOnce),
    anUsage('cuboC-escotilla-trasera', ['Esta escotilla está bloqueada, no se puede abrir.'], !useOnlyOnce),

  ],
  enemies: [
      aEnemy('cuboA-rat', 'Rata', ['ratón', 'rata de cloaca', 'sagutxu'], 'Es una rata de cloaca, con un pelo mugroso y mucha mala baba',
          'cuboA', 15, 5, true, false),
  ]
};
