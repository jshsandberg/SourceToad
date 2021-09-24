var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function mutateArray(a) {

  const array = [];
 
    const flattenObj = (obj, answer = {}) => {
        for(let key in obj){
            if (Array.isArray(obj[key])) {
                answer[key] = Object.values(obj[key]).reduce((a, b) => a + b, 0);
            }
            else if (typeof obj[key] == 'object') {
                flattenObj(obj[key], answer);
            } 
            else {
            answer[key] = obj[key];
          }
        };
        array.push(answer);
    };

    a.forEach(item => {
      if (item.guest_type === "guest")
        flattenObj(item);
    });

    array.sort((a, b) => {
      return a.last_name === b.last_name ? a.first_name.localeCompare(b.first_name) : a.last_name.localeCompare(b.last_name);
    });


    return [...new Set(array)];   
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
