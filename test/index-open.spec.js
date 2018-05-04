const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);


describe('El Cubo - when Opening a Hatch', () => {
    xit(`tells cannot found an Hatch outside current room`, () => {
        const request = aDfaRequest()
            .withIntent('use')
            .withArgs({ arg: 'escotilla superior' })
            .withData({ roomId: 'cuboC' })
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('No veo');
    });

    it(`tells cannot open a locked Hatch`, () => {
        const request = aDfaRequest()
            .withIntent('use')
            .withArgs({ arg: 'escotilla izquierda' })
            .withData({ roomId: 'cuboC' })
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('bloqueada');
    });

    it(`tells cannot open a Hatch when I'm chained`, () => {
        const request = aDfaRequest()
            .withIntent('use')
            .withArgs({ arg: 'escotilla frontal' })
            .withData({ roomId: 'cuboA' })
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('cadena');
    });

    describe('that has already opened', () => {
        it(`tells can open a Hatch and describe next room`, () => {
            const request = aDfaRequest()
                .withIntent('use')
                .withArgs({ arg: 'Escotilla superior' })
                .withData({ roomId: 'cuboA', unlocked: ['cuboA-cadenas-unlocked'] })
                .build();

            elCubo.elCubo(request);

            expect(getDfaApp().lastAsk).to.contains('Abres');
            expect(getDfaApp().lastAsk).to.contains('puedo ver');
        });
    });
});
