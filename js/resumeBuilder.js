
document.addEventListener('DOMContentLoaded', async function() {
    await fetch('./source/resume.json')
      .then( async response => await response.json())
      .then(data => {
        console.log(data)
        const workExperienceSection = document.getElementById('work-experience');
        workExperienceSection.innerHTML = '<h2>Work Experience</h2>';
  
        data.workExperience.forEach(job => {
          const jobDiv = document.createElement('div');
          jobDiv.className = 'job';
  
          const jobTitle = document.createElement('h3');
          jobTitle.textContent = job.title + " at " + job.company;
          jobDiv.appendChild(jobTitle);
  
          const jobDate = document.createElement('p');
          jobDate.textContent = job.date;
          jobDiv.appendChild(jobDate);
  
          const dutiesList = document.createElement('ul');
          job.duties.forEach(duty => {
            const dutyItem = document.createElement('li');
            dutyItem.textContent = duty;
            dutiesList.appendChild(dutyItem);
          });
          jobDiv.appendChild(dutiesList);
  
          workExperienceSection.appendChild(jobDiv);
        });

        const educationSection = document.getElementById('education');
        educationSection.innerHTML = '<h2>Education</h2>';

        data.education.forEach(school => {
            const schoolDiv = document.createElement('div');
            schoolDiv.className = 'education-entry';
    
            const schoolTitle = document.createElement('h3');
            schoolTitle.textContent = school.degree + " at " + school.institution;
            schoolDiv.appendChild(schoolTitle);
    
            const schoolDate = document.createElement('p');
            schoolDate.textContent = school.date;
            schoolDiv.appendChild(schoolDate);
    
            const coursesList = document.createElement('ul');
            school.courses.forEach(course => {
              const courseItem = document.createElement('li');
              courseItem.textContent = course;
              coursesList.appendChild(courseItem);
            });
            schoolDiv.appendChild(coursesList);
    
            educationSection.appendChild(schoolDiv);
          });
      })
      .catch(error => console.error('Error loading work experience:', error));
  });