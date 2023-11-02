const passwordInput = document.querySelector("#pasinput");
const requirementList = document.querySelectorAll(".req");

const requirements = [
    { regex: /.{8,}/, index: 0 },
    { regex: /[0-9]/, index: 1 },
    { regex: /[a-z]/, index: 2 },
    { regex: /[^A-Za-z0-9]/, index: 3 },
    { regex: /[A-Z]/, index: 4 }
];

passwordInput.addEventListener("input", (e) => {
    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        if (isValid) {
            requirementItem.style.textDecoration = "line-through"; 
            requirementItem.style.color = "#cecdfc";
        } else {
            requirementItem.style.textDecoration = "none"; ; 
        }
    });
});

document.getElementById('googleLoginButton').addEventListener('click', function() {
    const clientID = '734678762544-l8v10tmg9bouf8sn1052j0jv3movk7q0.apps.googleusercontent.com';
    const redirectURI = 'http://localhost:3000/auth/google/callback';
    const scope = 'profile email';
    const responseType = 'code';

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}`;
    window.location.href = googleAuthURL;
});
