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