document.getElementById('inspection-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var unitNumber = document.getElementById('unit-number').value;
    var issue = document.getElementById('issue').value;
    var note = document.getElementById('note').value;
    var photoFile = document.getElementById('photo').files[0];

    var reader = new FileReader();
    reader.onloadend = function() {
        var photoData = reader.result;

        // Send the data to Google Apps Script
        fetch('https://script.google.com/a/macros/kanahiku.com/s/AKfycbyKMGVtMIk6x9ZqiJf7cS8zJkxDEsWGAhTkJ0S7BxWSxnlHPTdsG6LlIxS9d-MZaV7L/exec', {
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
        }).then(response => response.json())
          .then(data => {
              alert('Data saved successfully!');
          }).catch(error => {
              console.error('Error:', error);
          });
    };
    reader.readAsDataURL(photoFile);
});
