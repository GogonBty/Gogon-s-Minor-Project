document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const rollNo = document.getElementById('rollNo').value;
    const name = document.getElementById('name').value;
    const degree = document.getElementById('degree').value;
    const city = document.getElementById('city').value;

    // Send data to the server using Fetch API
    await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo, name, degree, city }),
    });

    // Refresh the student table
    loadStudents();
});

async function loadStudents() {
    const response = await fetch('/api/students');
    const students = await response.json();

    const tableBody = document.getElementById('student-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear table

    students.forEach((student) => {
        const row = `<tr>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.degree}</td>
            <td>${student.city}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Load students when the page loads
loadStudents();
