//actions type constants
const INCREMENT = 'INCREMENT';
const INCREMENT2 = 'INCREMENT2';
const DECREMENT = 'DECREMENT';
const DECREMENT2 = 'DECREMENT2';

//ACTION CREATOR FOR INCREMENT
const incrementCount = (amount?:number):IncrementAction => {
    console.log("increment action performed");
    
    return {
        type : INCREMENT ,
        payload : {
            amount,
        }
    }
}
const incrementCount2 = (amount?:number):IncrementAction => {
    console.log("increment action performed");
    
    return {
        type : INCREMENT2 ,
        payload : {
            amount,
        }
    }
}
const decrementCount = (amount?:number):DecrementAction => {
    console.log("increment action performed");
    
    return {
        type : DECREMENT 
    }
}
const decrementCount2 = (amount?:number):DecrementAction => {
    console.log("increment action performed");
    
    return {
        type : DECREMENT2
    }
}


export {
    INCREMENT ,
    incrementCount ,
    incrementCount2 ,
    decrementCount ,
    decrementCount2 ,
    DECREMENT
}


//TYPES
export type IncrementAction = {
    type : typeof INCREMENT | typeof INCREMENT2 ;
    payload : {
        amount?:number
    }
}

export type DecrementAction = {
    type : typeof DECREMENT | typeof DECREMENT2;
}

//COMBINE ALL POSSIBLE ACTIONS
export type CounterAction = IncrementAction | DecrementAction;