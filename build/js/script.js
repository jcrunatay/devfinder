const url = "https://api.github.com/users/";
const submitBtn = document.querySelector('#submitBtn');
const username_input = document.querySelector('#username-input');
const avatars = document.querySelectorAll(".avatar");
const profile_name = document.querySelector('#profile-name');
const login_name = document.querySelector('#login-name');
const date_joined = document.querySelector('#date-joined');
const bio = document.querySelector('#bio');
const repos = document.querySelector('#reposNumber');
const followers = document.querySelector('#followersNumber');
const following = document.querySelector('#followingNumber');
const user_location = document.querySelector('#user-location');
const twitter = document.querySelector('#twitter');
const blog = document.querySelector('#blog');
const company = document.querySelector('#company');
const user_info_container = document.querySelector("#user-info-container");
const error_message = document.querySelector("#error-message");
const socials = [user_location,twitter,blog,company]; 

//darkmode elements
const toggle_switch = document.querySelector('#toggle-switch');
const dark_switch_text = document.querySelector('#dark-switch-text');
const sun_icon = document.querySelector('#sun-icon');
const moon_icon = document.querySelector('#moon-icon');
const shadow_containers = document.querySelectorAll('.shadow-container');


//theme variables
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;


//icon toggling
const iconToggle = () =>{
    sun_icon.classList.toggle('hidden');
    moon_icon.classList.toggle('hidden');
}

//Initial theme check
const themeCheck = () =>{
    if(userTheme === "dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add('dark');
        moon_icon.classList.add('hidden'); 
        dark_switch_text.innerHTML = "LIGHT"; 
        sun_icon.classList.remove('hidden');
        shadow_containers.forEach(shadow_container => {
            shadow_container.classList.remove('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]');
        });
        return
    } 

    sun_icon.classList.add('hidden');
    moon_icon.classList.remove('hidden'); 
    dark_switch_text.innerHTML = "DARK"; 
    shadow_containers.forEach(shadow_container => {
        shadow_container.classList.add('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]');
    });
}

//manual theme switch
const themeSwitch = () => {
    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme','light');
        dark_switch_text.innerHTML = "DARK"; 
        shadow_containers.forEach(shadow_container => {
            shadow_container.classList.contains('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]') ? "" : shadow_container.classList.add('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]')
        }); 
        iconToggle();
        return;
    } 

    dark_switch_text.innerHTML = "LIGHT";
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme','dark');
    shadow_containers.forEach(shadow_container => {
        shadow_container.classList.remove('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]');
    });
    iconToggle();
}

//call theme switch on clicking buttons
toggle_switch.addEventListener('click',() => {
    themeSwitch();
});


//invoke theme check  on initial load
themeCheck();






//TOGGLE DARK MODE
/* const toggleDarkMode = () =>{

    document.documentElement.classList.toggle('dark');

    //check if it is in darkmode
    const isDarkMode = document.querySelector('.dark') ? true : false;

    if(isDarkMode)
        dark_switch_text.innerHTML = "LIGHT";
    else
        dark_switch_text.innerHTML = "DARK";

    moon_icon.classList.toggle('hidden');
    sun_icon.classList.toggle('hidden');

    //remove the drop-shadow class
    shadow_containers.forEach(shadow_container => {
        shadow_container.classList.toggle('drop-shadow-[0_10px_10px_rgba(75,105,155,0.2)]');
    }); 

}; */

/* toggle_switch.addEventListener('click',toggleDarkMode); */




//DISPLAY THE INFORMATION OF THE SEARCHED USER
const displayNewUserInfo = (user) => {
    //display avatar
    avatars.forEach(avatar => {
        avatar.src = user['avatar_url'];
    });

    //display name
    profile_name.innerHTML = user['name']

    //display login_name
    login_name.innerHTML = user['login']
    
    //display bio if exist 
    user['bio'] === null || user['bio'] === "" ? bio.innerHTML = "This profile has no bio" : bio.innerHTML = user['bio'];

    //display date
    const date_created = user['created_at'].split('');
    date_created.splice(10);

    //convert array to string
    const inputDateString = date_created.join('');

    // Split the input date string into year, month, and day components
    const [year, month, day] = inputDateString.split('-');

    // Create an array of month names
    const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];


    
    // Convert the month to a number and subtract 1 (months are 0-indexed in JavaScript)
    const monthIndex = parseInt(month) - 1;

    // Construct the customized date string
    const customizedDateString = `${day} ${monthNames[monthIndex]} ${year}`;

    date_joined.innerHTML =  customizedDateString; // Output: "25 January 2011"


    //repos , followers , following
    repos.innerHTML = user['public_repos'];
    followers.innerHTML = user['followers'];
    following.innerHTML = user['following'];

    //display location, twitter, blog, company
    const searchedUserInfo = [user['location'],user['twitter_username'],user['blog'],user['company']];
    for (let i = 0; i < socials.length; i++) {
        if(searchedUserInfo[i] === "" || searchedUserInfo[i] === null)
            socials[i].innerHTML = "Not Available";
        else
        socials[i].innerHTML = searchedUserInfo[i];
    }
}; 


//FIND USER BASE ON THE INPUT
const findUser = async (e) => {
    e.preventDefault();
    try {
        const username = document.querySelector('#username-input').value;
        const response = await fetch(`${url}${username}`);
        if (response.ok) { 
            const user = await response.json();
            displayNewUserInfo(user);

            //show info
            user_info_container.classList.remove('hidden')
            error_message.classList.add("hidden")
        } else {
            //SHOW NO USER FOUND
            user_info_container.classList.add('hidden')
            error_message.classList.remove("hidden")
        }
    } catch (error) {
        console.log(error)
    }
} 

submitBtn.addEventListener('click', findUser);




