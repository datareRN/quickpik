//quick and simple plugin to get input type (including selects)
jQuery.fn.getType = function() {
    if(this.length > 0) {
        return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase();
    }
}

function saveStep(key, fields) {
    //get any values currently set in the session
    if(values = window.localStorage.getItem(key)) {
        values = JSON.parse(values);
    }
    if(values === null) {
        values = {};
    }

    data = {};

    for(var i = 0; i < fields.length; i++) {
        data[fields[i]] = {}; //create the input as blank until we know more
        type = jQuery('[name='+fields[i]+']').getType();
        if(type === 'radio') {
            value = jQuery('input[name='+fields[i]+']:checked').val();
            notes = '';
            pic = '';

            if(typeof(value) != 'undefined') { //make sure something is selected
                if(value === 'Pass' || value === 'Fail' || value === 'Exception') { //we need to get the pic and notes
                    pic = jQuery.camera('get', fields[i]);
                    if(!pic) { //check if we have a pic in the session store, if we've come back to thie current step
                        if(typeof(values[fields[i]]) === 'object') {
                            pic = values[fields[i]].pic;
                        }
                    }

                    notes = jQuery('input[name='+fields[i]+'Notes]').val();
                }

                data[fields[i]] = {
                    value: value,
                    notes: notes,
                    pic: pic
                }
            }
        }else if(type === 'text' || type === 'date' || type === 'select' || type === 'number') {
            data[fields[i]] = {
                value: jQuery('[name='+fields[i]+']').val()
            }
        }else if(type == 'a') {
            data[fields[i]] = {
                value: pic = jQuery.camera('get', fields[i])
            }
        }
    }

    window.localStorage.setItem(key, JSON.stringify(data));
}

function loadStep(key) {
    if(values = window.localStorage.getItem(key)) {
        values = JSON.parse(values);
    }

    for(field in values) {
        $input = jQuery('[name='+field+']');
        type = $input.getType();

        if(type === 'radio') {
            jQuery('input[name='+field+'][value="'+values[field].value+'"]').click(); //click the element, so events fire

            if(values[field].value === 'Pass' || values[field].value === 'Fail' || values[field].value === 'Exception') {
                jQuery('input[name='+field+'Notes]').val(values[field].notes);
                if(values[field].pic) {
                    jQuery('[data-camera="'+field+'"]').html('<div style="text-align: center;"><img src="'+values[field].pic+'" width="140" /></div>');
                }
            }
        }else if(type === 'text' || type === 'date' || type === 'select' || type === 'number') {
            $input.val(values[field].value);
        }else if(type === 'a') {
            if(values[field].value) {
                jQuery('[data-camera="'+field+'"]').html('<div style="text-align: center;"><img src="'+values[field].value+'" width="140" /></div>');
            }
        }
    }
}

function isComplete() {
    db = window.localStorage;
    if(
        db.getItem('step-vehicle-confirm')
        && db.getItem('step-2-1')
        && db.getItem('step-2-2')
        && db.getItem('step-2-2')
        && db.getItem('step-2-3')
        && db.getItem('step-2-4')
        && db.getItem('step-3-1')
        && db.getItem('step-3-2')
        && db.getItem('step-3-3')
        && db.getItem('step-3-4')
        && db.getItem('step-3-5')
        && db.getItem('step-4-1')
        && db.getItem('step-4-2')
        && db.getItem('step-4-3')
        && db.getItem('step-4-4')
        && db.getItem('step-4-5')
        && db.getItem('step-additional-requirements')
    ) {
        return true
    }else{
        return false;
    }
}

//delete everything related to an active test from session
function clearTest() {
    window.localStorage.removeItem('test-meta');
    window.localStorage.removeItem('step-vehicle-confirm');
    window.localStorage.removeItem('step-2-1');
    window.localStorage.removeItem('step-2-2');
    window.localStorage.removeItem('step-2-2');
    window.localStorage.removeItem('step-2-3');
    window.localStorage.removeItem('step-2-4');
    window.localStorage.removeItem('step-3-1');
    window.localStorage.removeItem('step-3-2');
    window.localStorage.removeItem('step-3-3');
    window.localStorage.removeItem('step-3-4');
    window.localStorage.removeItem('step-3-5');
    window.localStorage.removeItem('step-4-1');
    window.localStorage.removeItem('step-4-2');
    window.localStorage.removeItem('step-4-3');
    window.localStorage.removeItem('step-4-4');
    window.localStorage.removeItem('step-4-5');
    window.localStorage.removeItem('step-additional-requirements');

    if(typeof(jQuery.camera) === 'function') {
        jQuery.camera('clear');
    }
}
