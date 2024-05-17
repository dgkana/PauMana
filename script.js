document.getElementById('inspection-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var unitNumber = document.getElementById('unit-number').value;
    var issue = document.getElementById('issue').value;
    var note = document.getElementById('note').value;
    var photoFile = document.getElementById('photo').files[0];

    if (!photoFile) {
        alert('Please take a photo.');
        return;
    }

    var reader = new FileReader();
    reader.onloadend = function() {
        var photoData = reader.result;

        fetch('https://script.google.com/macros/s/AKfycby-I1jdHgZv2-HPh0m6gqbFTMrs6XBcPaF5wetXqugXZXRMptE9kDPzbuuujHTlpMyf/exec', {
            method: 'POST',
            body: JSON.stringify({
                unitNumber: unitNumber,
                issue: issue,
                note: note,
                photoData: photoData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Data saved successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        });
    };

    reader.onerror = function() {
        console.error('File could not be read! Code ' + reader.error.code);
        alert('Failed to read file.');
    };

    try {
        reader.readAsDataURL(photoFile);
    } catch (err) {
        console.error('Error reading file:', err);
        alert('An error occurred while reading the file.');
    }
});
