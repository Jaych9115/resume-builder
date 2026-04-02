function generateResume() {

    document.getElementById("rname").innerText = document.getElementById("name").value;
    document.getElementById("remail").innerText = document.getElementById("email").value;
    document.getElementById("rphone").innerText = document.getElementById("phone").value;
    document.getElementById("rskills").innerText = document.getElementById("skills").value;
    document.getElementById("reducation").innerText = document.getElementById("education").value;
    document.getElementById("rexperience").innerText = document.getElementById("experience").value;

    let file = document.getElementById("photo").files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("rphoto").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    let template = document.getElementById("template").value;
    let resume = document.getElementById("resume");

    resume.classList.remove("modern", "classic");
    resume.classList.add(template);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;

    let resume = document.getElementById("resume");

    html2canvas(resume, {
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {

        let imgData = canvas.toDataURL("image/png");

        let pdf = new jsPDF('p', 'mm', 'a4');

        let imgWidth = 210;
        let imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("resume.pdf");
    });
}