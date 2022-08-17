function openDropdown() {
    document.getElementById("dropdowndiv").style.display = "inline";
    let dropdown = document.getElementById('user-dropdown');
    let defaultOption = document.createElement('option');
    let defaultOptgroup = document.createElement('optgroup');

    const url =
        'https://evening-fjord-72698.herokuapp.com/https://staging.clio.com/api/v4/users?order=name(asc)&limit=200&include_co_counsel=true&fields=id,name,first_name,last_name,initials,rate,subscription_type,email,enabled,user_status,account_owner,court_rules_default_attendee,default_activity_description,clio_connect,roles';

    fetch(url, {
        method: 'get',
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("accesstoken"),
            'Accept': "*/*",
            'Connection': "keep-alive",
            'Content-Type': "application/json"
        }
    })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response  
                response.json().then(function (data) {
                    var dataretrieved = data.data;
                    let option;
                    let optgroup;

                    var arrdata = dataretrieved.map(object => {
                        if (object.user_status === "Firm Users") {
                            return { ...object, user_status: "Firm User" };
                        }
                        return object;

                    });
                    var arrdatafinal = arrdata.map(object => {
                        if (object.user_status === "Co-counsel Users") {
                            return { ...object, user_status: "Co-counsel User" }
                        }
                        return object;
                    })
                    for (let i = 0; i < arrdatafinal.length; i++) {
                        option = document.createElement('option');
                        option.text = arrdatafinal[i].name;
                        option.value = arrdatafinal[i].name;
                        optgroup = document.createElement('optgroup');
                        optgroup.label = arrdatafinal[i].user_status
                        dropdown.add(optgroup);
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}

function removeDropdown() {
    let d = document.getElementById("user-dropdown");
    while (d.firstChild) {
        d.removeChild(d.firstChild)
    }
    document.getElementById("dropdowndiv").style.display = "none";

}
