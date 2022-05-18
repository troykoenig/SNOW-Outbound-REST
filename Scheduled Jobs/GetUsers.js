var users = [];
var restToTines = new RestToTines();
var gr = new GlideRecord('sys_user_grmember.do');
gr.addEncodedQuery('group=679434f053231300e321ddeeff7b12d8');
gr.query();

while(gr.next()) {
    var user = {
        "full_name": gr.getValue('full_name'),
        "email": gr.getValue('email')
    };
    users.push(user);
}

var payload = {
    "results": users
}

var resp = restToTines("POST", payload)

