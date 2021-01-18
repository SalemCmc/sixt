import { getPrices, getHours} from '../helpers/dropDownItems'

describe('Test for helper functions', () => {

    it('should get amount (no params)', () => {   
        let prices=getPrices();
        expect(prices.length).toBeGreaterThan(0);
    });
    it('should get amount with amount param 400', () => {      
        let prices=getPrices(400);
        expect(prices[prices.length-1]).toEqual(400);
     });

});

describe('Test HOURS for helper functions', () => {

    it('should get 48 items', () => {  
       let hours=getHours();
       expect(hours.length).toEqual(48);
    });
});

