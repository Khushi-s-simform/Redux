import {
    INCREMENT ,
    DECREMENT ,
    CounterAction
}from '../actions/countActions'
  
  type State = {
    value: number;
    value2: number;
  };

  const initialState : State = {value:0 , value2:0};

  function countReducer ( state = initialState , action : CounterAction ):State {

    console.log("reducer called - ",action.type);

    switch(action.type) {
        case "INCREMENT" : {
            console.log("Increment Reducer Called");

            const amount = action.payload?.amount ?? 1
            return {
                ...state,
                value : state.value + amount ,
            }
            
        }
        case "INCREMENT2" : {
            console.log("Increment Reducer Called");

            const amount = action.payload?.amount ?? 1
            return {
                ...state,
                value2 : state.value2 + amount ,
            }
            
        }

        case "DECREMENT" : {
            console.log("Decrement Reducer Called");

            return {
                ...state ,
                value : state.value - 1,
            }
            
        }
        case "DECREMENT2" : {
            console.log("Decrement Reducer Called");

            return {
                ...state ,
                value2 : state.value2 - 1,
            }
            
        }
        default : {
            return state ;
        }
    }
    
  }

  export default countReducer ;