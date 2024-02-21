class Model {
    constructor() {
        
    }

    async fetchData(){
        try {
            let response = await fetch('./data.json');
            if (!response.ok) throw new Error('Invalid response');
            let data = await response.json();
            return data.employees;
        } catch (error) {
            console.error(error.message);
        }
    }
}

class View {
    constructor() {
        this.employeesContainer = document.querySelector('.employees');
        console.log(this.employeesContainer);
    }

    //Dark mode functionality
    darkMode(){
        (function(){
            /* get the elements */
            const darkModeCheckBox = document.getElementById('checkbox');
            const root = document.documentElement;
            const label = document.querySelector('label');
            
            const darkMode = () => {
                if (darkModeCheckBox.checked) {
                    root.classList.add('dark');
                    label.textContent = "Light Mode";
            
                    /* Reset the local storage darkMode toggle */
                    localStorage.setItem('darkMode', "on");
                }else{
                    root.classList.remove('dark');
                    label.textContent = "Dark Mode";
                    localStorage.setItem('darkMode', "off");
                }
            }
            darkModeCheckBox.addEventListener('change', darkMode);

            window.addEventListener('load', () => {
                darkModeCheckBox.checked = localStorage.getItem('darkMode') === "on";
                darkMode();
            });
            }());
    }

    //1. Render the employee
    renderEmployee(data){
        let employee = this.employeeMarkup(data);
        this.employeesContainer.appendChild(employee);
    }

    //the employee markup
    employeeMarkup(data) {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`  <article class="flex w-[300px] max-w-[23rem] flex-col justify-center items-center gap-[.8rem] bg-[#CCCCCC] dark:bg-[#0A0A0A] rounded-[1.5rem] pb-8 duration-[.5s] cursor-pointer hover:scale-[1.1]">

        <div class="profile">
            <img src="${data.user.image}" alt="${data.user.username}">
        </div>
        <div>
            <h1 class="text-[2.5rem] font-[600] text-[#0A0A0A] dark:text-white name">${data.user.username}</h1>
            <p class="text-center text-[1rem] font-[400] leading-normal text-black dark:text-[#676767] position">${data.position}</p>
            <p class="flex justify-center gap-[.5rem] text-black dark:text-[#676767] text-[1rem] font-[400] leading-normal location">
                <img src="./images/MapPin.svg" alt="Pin">
                ${data.location}
            </p>
        </div>

        <div>
            <button class="flex rounded-[0.6rem] py-[1rem] px-[1.5rem] justify-center items-center font-[700] gap-[.5rem] text-white border-2 dark:border-none bg-[#0A0A0A] dark:bg-white dark:text-black duration-[.5s] hover:bg-[#7b7a7a] hover:border-2 hover:border-black hover:text-black">
                <img class="dark:hidden" src="./images/EnvelopeLight.svg" alt="message">
                <img class="hidden dark:block" src="./images/EnvelopeSimple.svg" alt="envelope">
                Get in touch
            </button>
        </div>

        <div>
            <p class="text-black dark:text-[#676767]">&copy; JHEX Foundation <span class="currentYear">${(new Date().getFullYear())}</span></p>
        </div>
    </article>
        `)
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init(){
        /* Enable dark mode */
        this.view.darkMode();

        //Fetch the data.
        let data = await this.model.fetchData();
        /* Render the employees from the fetched data. */
        data.forEach(employee=>{
            this.view.renderEmployee(employee);
        });
    }
}

let app = new Controller(new Model(), new View());
app.init();