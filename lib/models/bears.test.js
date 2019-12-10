require('dotenv').config(); 
require('../../lib/utils/connect')();
const Bears = require('./bears'); 

    describe('Bear Model', () => {
      it('Has a habitat', () => {
        const bear = new Bears({
            Thizze: true
        });
        const { errors } = bear.validateSync(); 

        expect(errors.Habitat.message).toEqual('Path `Habitat` is required.'); 
        });


    it('The species should be     a string', () => {
        const bear = new Bears({
            Species: {},
            Habitat: 'Yellowstone NP'
        });
        const { errors } = bear.validateSync(); 
        expect(errors.Species.message).toEqual('Cast to String failed for value \"{}\" at path \"Species\"');
});
});