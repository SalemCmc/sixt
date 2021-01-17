

// generate list of hours for pick-up and return time
export const getHours = () => 
{
    let hours=[];
    var i;
    for (i = 0; i < 24; i++)
    {
        if(i<10) hours.push('0'+i+':00','0'+i+':30' );
        else     hours.push( i+':00',i+':30');     
    }
    return hours;
}
export const getPrices = () => 
{
    let prices=["all"];
    var i;
    for (i = 50; i <= 350; i=i+10)
    {
       
        if(i>100 && i<200 && i%20===0)
        {
           prices.push(i);    
        }
        if(i>200 && i<300 && i%40===0 || i===200 )
        {
           prices.push(i);    
        }


        if(i<=100 || i===300 || i===350)
        {
           prices.push(i);    
        }
    }

    //console.log("prices: ",prices);
    return prices;
}