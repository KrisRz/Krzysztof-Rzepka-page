// @ts-nocheck
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const formFields = document.querySelectorAll(".form-field");
const submitButton = document.getElementById("submit-btn");
const responseMsg = document.getElementById("response-msg");
const copyright = document.getElementById("copyright");

async function sendEmail(name, email, subject, message) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    responseMsg.innerText = "Email sent successfully!";
  } catch (error) {
    responseMsg.innerText = "An error occurred while sending email";
  }
}

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (Array.from(formFields).some((field) => field.value === "")) {
    responseMsg.innerText = "Please fill in all fields";
  } else {
    sendEmail(name.value, email.value, subject.value, message.value);
  }

  setTimeout(() => {
    responseMsg.innerText = "";
  }, 3000);
});

copyright.innerText = new Date().getFullYear();

// animations
gsap.utils.toArray("h2, p:not(#response-msg):not(.copyright-p)").forEach((el) => {
  gsap.from(el, {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.5,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
    },
  });
});

gsap.from(".hero-button", { duration: 1, opacity: 0, delay: 0.5, stagger: 0.3 });

gsap.from(".skills-div i", {
  duration: 1.5,
  opacity: 0,
  x: 50,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".skills-div i",
    start: "top 68%",
    end: "bottom 30%",
  },
});
