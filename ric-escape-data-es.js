const aRoom = (id, name, synonyms, description, events) =>
  ({ id, name, synonyms, description, events });
const aHatch = (id, name, synonyms, description, location, isLocked) =>
    ({ id, name, synonyms, description, location, isLocked });
const anItem = (id, name, synonyms, description, location, pickable, pickingResponse) =>
  ({ id, name, synonyms, description, location, pickable, pickingResponse });
const anUsage = (items, response, onlyOnce) =>
  ({ items, response, onlyOnce });
const anUnlockingAction = (response, lock) => ({ isUnlockingAction: true, response, lock });
const aPickingAction = (response, itemId) => ({ isPickingAction: true, response, itemId });
const aConditionalResponse = conditions => ({ isConditional: true, conditions });
const aLockedDestination = (roomId, lock) => ({ isLockedDestination: true, roomId, lock });
const aCondDesc = (condition, description) => ({ conditional: true, condition, description });
const aCondDescUsage = (consumesObjects, condition, description) =>
  ({ conditional: true, consumesObjects, condition, description });
const theEndingScene = description => ({ isEndingScene: true, description });
const isPickable = true;
const useOnlyOnce = true;
const consumesTheObjects = true;
const isLocked = true;

exports.data = {
  sentences: {
    'game-intro': 'Tommy, te acabas de despertar y apareces en una habitación sin ventanas iluminada de rojo. Te sientes un poco aturdido aún, pero eso no te impide darte cuenta que estás encadenado. No sabes qué haces ahí ni por qué. Te preguntas cómo podrías salir vivo de esta situación...',
    help: 'Puedes hacer las siguientes acciones: Mirar, Abrir, Usar, Ir, Coger, Inventario, Atacar y Defenderse. Puedes moverte por dirección (adelante) o por nombre ¿Qué quieres hacer a continuación?',
    'help-no-screen': 'Puedes hacer las siguientes acciones: Mirar, Abrir, Usar, Ir, Coger, Inventario, Atacar y Defenderse. ¿Qué quieres hacer a continuación?',
    fallback: 'No te entiendo. Di Ayuda si necesitas ayuda. ¿Has revisado bien el cubo?',
    destinations: 'Desde aquí puedo ir a: {destinations}. ¿Qué quieres que haga?',
    'destination-unknown': 'No sé ir al sitio {destination}. ¿Qué quieres que haga?',
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
  },
  init: {
    life: 100,
    roomId: 'cuboA',
    inventory: ['dice', 'boots'],
    picked: ['dice', 'boots']
  },
  rooms: [
    aRoom('cuboA', 'Cubo A', [], 'La habitación tiene forma de cubo y está iluminada de rojo. Tiene 3 escotillas, una arriba, una delante y otra a tu derecha. En el centro de la habitación ves dos cuerdas.', {
      'exit': 'Muahahahaha, te mereces todo lo malo que te pase. Estás encerrado debido a las malas acciones que has cometido durante tu vida, solo la redención te dará la libertad. Vigila tus dónde pisas.'
    }),
    aRoom('cuboB', 'Cubo B', [], 'Cubo 2 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboC', 'Cubo C', [], 'Cubo 3 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboD', 'Cubo D', [], [
      aCondDesc('!picked:comedor-cartera', 'No he cogido... Cubo 2 descripción. ¿qué haré a continuación?'),
      aCondDesc('default', 'Cubo 4 descripción. ¿qué haré a continuación?'),
    ], {}),
    aRoom('cuboE', 'Cubo E', [], 'Cubo 5 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboF', 'Cubo F', [], 'Cubo 6 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboG', 'Cubo G', [], 'Cubo 7 descripción. ¿qué haré a continuación?', {}),
    aRoom('cuboH', 'Cubo H', [], 'Cubo 8 descripción. ¿qué haré a continuación?', {}),
  ],
  hatchs: [
      aHatch('cuboA-escotilla-superior', 'Escotilla superior', ['escotilla superior', 'escotilla de arriba', 'escotilla del tejado', 'escotilla del techo'], [
          aCondDesc('opened:cuboA-escotilla-superior', 'Desde aquí puedo ver un cubo con luz blanca, es el cubo C.'),
          aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del techo. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared y el techo que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
          aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla del techo'),
      ], 'cuboA', !isLocked),
      aHatch('cuboA-escotilla-frontal', 'Escotilla frontal', ['escotilla delantera', 'escotilla de enfrente', 'escotilla de delante'], [
          aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del techo. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
          aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla de enfrente'),
      ], 'cuboA', isLocked),
      aHatch('cuboA-escotilla-derecha', 'Escotilla derecha', ['escotilla superior', 'escotilla de arriba', 'escotilla del tejado', 'escotilla del techo'], [
          aCondDesc('!unlocked:primera-escotilla-unlocked', 'Es una escotilla situada justo en el centro del lateral. Es como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella, hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.'),
          aCondDesc('else:primera-escotilla-unlocked', 'Es la escotilla de la derecha'),
      ], 'cuboA', isLocked),

      aHatch('cuboC-escotilla-derecha', 'Escotilla derecha', ['escotilla superior', 'escotilla de arriba', 'escotilla del tejado', 'escotilla del techo'], 'Es una escotilla derecha.', 'cuboC', !isLocked, {}),
  ],
  map: {
    'cuboA': ['cuboC'],
    'cuboC': ['cuboD', 'cuboG'],
    'cuboD': ['cuboB', 'cuboD'],
    'cuboG': ['cuboC', 'cuboH'],
    'cuboH': ['cuboD', 'cuboF', 'cuboG'],
    'cuboB': ['cuboD', 'cuboF'],
    'cuboF': ['cuboB', 'cuboH']
  },
  items: [
    anItem('dice', 'Dado de 6 caras', ['dado', 'dados', 'dado de 6 caras', 'dado de 6 lados'], 'Es un dado de 6 caras', null, isPickable),
    anItem('boots', 'Botas', ['botas', 'zapatos', 'calzado'], 'Son unas botas de marca Coronel Tapioca de cuero marrón.', null, isPickable),
    anItem('cuboA-escotillas', 'Escotillas', ['escotillas'], 'Son tres escotillas, están situadas justo en el centro del lateral. Paracen como de un submarino, el tamaño es como para que solo una persona a la vez pueda entrar por ella y hay una escalera incrustada en la pared que te permite acceder a ella. Tiene un accionador circular en el centro que supones que es para abrirla.', 'cuboA', !isPickable),
    anItem('cuboA-cuerdas', 'Cuerdas', ['cuerdas', 'las cuerdas'], 'Ves dos cuerdas, una la izquierda y otra a la derecha que se dirigen hasta la esquina opuesta a la tuya. Ves que las cuerdas están a tu alcance.', 'cuboA', !isPickable),
    anItem('cuboA-cuerda-izq', 'Cuerda izquierda', ['cuerda izquierda', 'cuerda de la izquierda', 'cordón izquierdo'], 'Ves que la cuerda va hasta el fondo y sube por la pared a través de guías, continúa por el techo y termina casi encima de ti. Aprecias que tiene algo brillante en el extremo pero no llegas a saber qué es. Podrías tirar de la cuerda, ¿tiras de ella?', 'cuboA', !isPickable),
    anItem('cuboA-cuerda-dcha', 'Cuerda derecha', ['cuerda derecha', 'cuerda de la derecha', 'cordón derecha'], 'Ves que la cuerda va hasta el fondo y sube por la pared a través de guías, continúa por el techo y se desvía ligeramente hacia la derecha acabando en una esquina del techo, cuelga una caja pequeña cuyo contenido no llegas a ver. Podrías tirar de la cuerda, ¿tiras de ella?', 'cuboA', !isPickable),
    anItem('cuboA-llaves', 'Llave de cadenas', ['llave', 'llaves'], [
        aCondDesc('!unlocked:cuboA-llaves-unlocked', '¿Qué llave?'),
        aCondDesc('unlocked:cuboA-llaves-unlocked', 'La llave podría entrar en la cerradura de las cadenas.'),
    ], 'cuboA', isPickable),
    anItem('cuboA-cadenas', 'Cadenas', ['cadena', 'cadenas', 'grillete', 'grilletes'],
      [
        aCondDesc('picked:cuboA-llaves', 'Igual podría usar la llave con las cadenas, ¿no?'),
        aCondDesc('else', 'Es una cadena robusta anclada a la pared y a tu pierna derecha. El extremo atado a tu pierna tiene una cerradura, crees que podrías abrirla con una llave o unas ganzúas.'),
      ], 'cuboA', !isPickable),


      anItem('cuboB-crowbar', 'Palanca', ['barra métalica', 'palanca'], 'Es una palanca métalica que me podría servir para defenderme o hacer fuerza en alguna escotilla.', 'cuboB', isPickable),
  ],
  usages: [
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


    anUsage('comedor-cartera', [
      aPickingAction('Veo que dentro de la cartera hay un papel, en el que está escrito la combinación 4815. Vaya seguridad, ¿guardando números secretos en la cartera? Bueno, me lo llevo por si es de utilidad. ¿Qué hago?', 'combinacion-4815'),
    ], true),
    anUsage(['combinacion-4815', 'hab108-cajafuerte'], [
      aPickingAction('Clic. Sí, la caja se ha abierto. Hay un aparato extraño dentro de la caja fuerte. Me lo llevo. ¿Qué hago?', 'hab108-aparato'),
    ], true),
    anUsage('sala-mandos-ordenador', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'No puedo alterar el curso de navegación del ordenador. Mi programación no me deja hacerlo, ya que la única forma de salvar la humanidad es estrellarnos y morir. ¿Qué hago?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, he alterado el curso de navegación, ya no os estrellaréis. Todo termina aquí. Felicidades, has conseguido salvarte, pero no has salvado a la humanidad. Podías haber hecho algo diferente para llegar a este punto. Pero no, has preferido salvarte tú. Lo siento, pero tú y tu raza estáis abocados a la extinción. Adiós.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('He alterado el curso de navegación, ya no os estrellaréis. Y además, la humanidad está salvada, ya que el patógeno está muerto por efecto del betacaroteno. ¡Enhorabuena! Has hecho un trabajo excelente. Hasta la próxima.')),
      ]),
    ], false),
    anUsage(['ric', 'sala-mandos-ordenador'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'No puedo alterar el curso de navegación del ordenador. Mi programación no me deja hacerlo, ya que la única forma de salvar la humanidad es estrellarnos y morir. ¿Qué hago?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, he alterado el curso de navegación, ya no os estrellaréis. Todo termina aquí. Felicidades, has conseguido salvarte, pero no has salvado a la humanidad. Podías haber hecho algo diferente para llegar a este punto. Pero no, has preferido salvarte tú. Lo siento, pero tú y tu raza estáis abocados a la extinción. Adiós.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('He alterado el curso de navegación, ya no os estrellaréis. Y además, la humanidad está salvada, ya que el patógeno está muerto por efecto del betacaroteno. ¡Enhorabuena! Has hecho un trabajo excelente. Hasta la próxima.')),
      ]),
    ], false),
    anUsage('biblio-libroric', [
      aPickingAction('Entre otras muchas cosas, dice que para reprogramar un robot RIC se debe usar el código 1893. Me apunto "Código 1893" en mi inventario. ¿Qué hago?', 'codigo-1893'),
    ], true),
    anUsage(['ric', 'codigo-1893'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricpending', 'Antes de introducir el código se debe utilizar un aparato para ello. ¿Qué hago?'),
        aCondDescUsage(true, 'unlocked:ricpending', anUnlockingAction('Oh, ¿Quieres que use este aparato conmigo mismo? Si lo haces perderé toda mi memoria... Bip. Bip. Vale. Entiende que lo que hice fue por el bien de la humanidad. Todos los humanos de esta nave lleváis un virus altamente contagioso que, si volvéis a vuestro planeta, extinguiréis la raza humana. Por favor, vuelve a dormirte. Vale, ejecutando instrucción de reseteo. 3, 2, 1. Hola, soy RIC, reestablecido a mis valores de fábrica. ¿Qué quieres que haga?', 'ricmodified')),
      ]),
    ], false),
    anUsage(['ric', 'hab108-aparato'], [
      anUnlockingAction('Ok, utilizado. Ahora mi interfaz pide un código. ¿No estarás haciendo lo que creo que estás haciendo, verdad? ¿Qué quieres que haga?', 'ricpending'),
    ], true),
    anUsage('hab108-diario', [
      'Son las primeras páginas de tu diario. Hablas de lo ilusionante que es este viaje, de llegar osadamente a lugares donde ninguna otra persona ha llegado antes. ¿Qué hago?',
      'En las siguientes páginas hablas del planeta extraño al que llegamos. Indicas cómo alguien de la tripulación se infectó de un extraño virus. El virus rápidamente se contagió al resto de la tripulación. ¿Qué más hago?',
      'Las siguientes páginas hablan de lo preocupado que estabas porque dicho virus llegara a la tierra. Un momento de desesperación finalmente te lleva a escribir tus últimas páginas. ¿Qué más hago?',
      'Te las leo literalmente: "No creo que haya cura, lo he intentado pero no puedo más, ya no hay tiempo. Mi mente se revela. He decidido que es mejor que muramos. He programado a RIC para que dirija la nave hacia la estrella más cercana.". Es muy duro, ¿quieres que siga leyendo? ¿Qué más hago?',
      'Durante la pasada noche, he gaseado a la tripulación con el Gasotrón del comedor. Yo dormiré esta noche. Estas son mis últimas palabras. En un par de días, moriremos. Será lo mejor para salvar la humanidad. ¿Qué más hago?',
      aConditionalResponse([
        aCondDescUsage(false, '!picked:hab108-librarykey', aPickingAction('En las últimas páginas hay una llave con el siguiente mensaje: "Lexus nos ha traido la muerte, así encierro yo esta muerte". Recojo la llave. ¿Qué más hago?', 'hab108-librarykey')),
        aCondDescUsage(false, 'else', 'No hay nada más escrito a excepción de "Lexus nos ha traido la muerte, así encierro yo esta muerte". ¿Qué más hago?'),
      ]),
    ], false),
    anUsage('hab108-librarykey', [
      '¿Con qué quieres usar la llave? Di Usar llave con objeto',
    ], false),
    anUsage(['hab108-librarykey', 'biblio-armario'], [
      anUnlockingAction('Ok, armario abierto. Ya puedo llegar a los libros sobre planetas. ¿Qué más hago?', 'libroplanetas'),
    ], true),
    anUsage('biblio-librovenus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué más hago?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', '¿Qué poca imaginación no? A ver, Venus es un planeta de masa 0.8 veces que la tierra y bla bla bla. ¿Para qué quieres saber todo esto?'),
      ]),
    ], false),
    anUsage('biblio-librolexus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué más hago?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', 'Hay mucha información sobre el planeta, pero quizás esto te interese: Los agentes biológicos del planeta Lexus encuentran altamente tóxicos los alimentos basados en carotenos, como por ejemplo, la zanahoria. ¿Qué más hago?'),
      ]),
    ], false),
    /* anUsage('hab108-cuadro', [
      'No creo que tenga que USAR el cuadro,
      pero quizás me lo puedo llevar... ¿Qué hago?',
    ], false), */
    anUsage(['hab108-cuadro', 'biblio-librarykey'], [
      'El cuadro no tiene que abrirse, está suelto. Incluso creo que me lo puedo llevar. ¿Qué hago?',
    ], false),
    anUsage(['comedor-gasotron', 'biblio-librarykey'], [
      'El Gasotrón no necesita ninguna llave para ser usado. Úsalo con una comida específica. ¿Qué hago?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-comida'], [
      'Hay demasiada comida que puedo usar con el Gasotrón. Especifica exactamente la comida que tengo que usar. ¿Qué más hago?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-zanahoria'], [
      anUnlockingAction('Introduzco la zanahoria en el gasotrón. Veo que un gas sale del gasotrón y se diluye por la nave. Puedo garantizar que el caroteno de la zanahoria se ha introducido en el organismo de todos los pasajeros, incluyendo en el tuyo. ¡Estáis salvados! Pero no lo celebres, todavía tenemos que desviar esta nave. Dime, rápido, ¿Qué más hago?', 'humanitysaved'),
    ], true),
  ],
};
