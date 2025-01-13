import * as messages from "../messages.json";
import chartIcon from "../assets/chart-icon.png";

document.addEventListener("DOMContentLoaded", function () {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(messages);
    console.log(messages);

    let currentIndex = 0;
    const alertElement = document.getElementById("alert-msg");

    function showAlert(message) {
        // Use a regular expression to find the amount and wrap it in a <strong> tag
        const formattedMessage = message.replace(
            /(\$\d{1,3}(,\d{3})*(\.\d{2})?|€\d{1,3}(,\d{3})*(\.\d{2})?|£\d{1,3}(,\d{3})*(\.\d{2})?)/,
            "<strong>$1</strong>"
        );
        alertElement.innerHTML = `<img class="w-6" src="${chartIcon}" /><span>${formattedMessage}</span>`;
        alertElement.classList.remove("hide");
        alertElement.classList.add("show");

        // Hide the alert after 3 seconds
        setTimeout(function () {
            alertElement.classList.remove("show");
            alertElement.classList.add("hide");
        }, 8000);
    }

    function loopMessages() {
        showAlert(messages[currentIndex]);
        currentIndex = (currentIndex + 1) % messages.length;

        setTimeout(loopMessages, 10000); // Wait 4 seconds before showing the next message
    }

    setTimeout(() => {
        loopMessages();
    }, 5000);
});
