// Sample attendance data (this can be fetched from a database in a real-world app)
const attendanceData = [
    { date: "2025-03-01", time: "10:00 PM", status: "Present", type: "Online" },
    { date: "2025-03-05", time: "5:00 PM", status: "Absent", type: "Offline" },
    { date: "2025-03-10", time: "9:00 PM", status: "Present", type: "Online" },
    { date: "2025-03-15", time: "5:00 PM", status: "Present", type: "Offline" },
    { date: "2025-03-20", time: "9:00 PM", status: "Absent", type: "Online" }
];

// Function to display attendance records
function displayAttendance() {
    const onlineTableBody = document.getElementById("onlineAttendanceTable");
    const offlineTableBody = document.getElementById("offlineAttendanceTable");

    attendanceData.forEach(record => {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const timeCell = document.createElement("td");
        const statusCell = document.createElement("td");

        dateCell.textContent = record.date;
        timeCell.textContent = record.time;
        statusCell.textContent = record.status;

        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(statusCell);

        if (record.type === "Online") {
            onlineTableBody.appendChild(row);
        } else {
            offlineTableBody.appendChild(row);
        }
    });
}

// Function to generate pie chart
function generatePieChart() {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const presentCount = attendanceData.filter(record => record.status === "Present").length;
    const absentCount = attendanceData.filter(record => record.status === "Absent").length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [presentCount, absentCount],
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        }
    });
}

// Function to generate line chart
function generateLineChart() {
    const ctx = document.getElementById('attendanceLineChart').getContext('2d');
    const dates = attendanceData.map(record => record.date);
    const hours = attendanceData.map(record => record.status === "Present" ? 1 : 0);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Hours Present',
                data: hours,
                borderColor: '#36A2EB',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours Present'
                    }
                }
            }
        }
    });
}

// Call the functions to populate the table and generate the charts on page load
window.onload = function() {
    displayAttendance();
    generatePieChart();
    generateLineChart();
};
