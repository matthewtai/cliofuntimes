//OAuth 
function verifyButton() {
    if (sessionStorage.getItem("accesstoken") == null || sessionStorage.getItem("accesstoken") == "undefined") {
        document.getElementById("verifiedbutton").style.display = "hidden";
    } else {
        document.getElementById("verifiedbutton").style.display = "inline";
    }
}

function saveKeyandSecret() {
    console.log("Key and Secret Saved")
    var formKey = document.getElementById('clientkey').value;
    var formSecret = document.getElementById('clientsecret').value;
    sessionStorage.setItem("clientkey", formKey);
    sessionStorage.setItem("clientsecret", formSecret);
}

function authorize() {
    var key = sessionStorage.getItem("clientkey");
    var redirect_uri = 'https://staging.clio.com/oauth/approval';
    var authorizeurl = 'https://staging.clio.com/oauth/authorize?response_type=code&client_id=' + key + '&redirect_uri=' +
        redirect_uri;
    console.log("I'M AUTHORIZING!");
    window.open(authorizeurl);
}
//Save Access Code
function saveAccessToken() {
    var key = sessionStorage.getItem("clientkey");
    var secret = sessionStorage.getItem("clientsecret");
    var redirect_uri = 'https://staging.clio.com/oauth/approval';
    var authorizationCode = document.getElementById('authcode').value;
    sessionStorage.setItem("authorizationcode", authorizationCode);
    var tokenurl =
        'https://staging.clio.com/oauth/token?client_id=' + key + '&client_secret=' + secret + '&grant_type=authorization_code&code=' + authorizationCode + '&redirect_uri=' + redirect_uri
    fetch(tokenurl, {
        method: 'post',
        headers: {
            'Host': 'staging.clio.com',
            'Connection': "keep-alive",
            'Content-Type': "application/x-www-form-urlencoded"
        }

    }).then((response) => response.json())
        .then((data) => sessionStorage.setItem("accesstoken", data.access_token)).then(setTimeout(() => window.location.reload(), 1500))

}





