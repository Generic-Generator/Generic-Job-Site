# Generic-Job-Site

Devoloping an MVP for a Job Search site since I have been on quite a few and have ideas for improvement. Updating deployed demo as I have time to work on it.

New Demo: [FULL STACK DEMO](http://107.23.19.214:3007/)
New Job Poster Feature added 2/11/23!

I hope this demo is a more accurate way to evaluate my skills than watching an edited screen cap. Style has been kept to a minimum because the issues I want to fix on other job sites are all issues of functionality, and sucessful job sites are similarly minimal in style. I looked up to see if a competitor had a dark mode, and found out it is hidden inside the user settings. While that means I don't have a style improvement, my switch in the header is more accessable to users.

Login Walkthrough

This is set up in preparation for authentication, which would spit out a user id only for sercurity purposes. I have white listed digits 0-9 and an alert will appear if a value that is not all digits is entered in the field or the log in is too long. Applicants can have up to 3 digits for thier ID, while posters are limited to 1 digit since they can add job postings.

Dark/Light mode toggle in upper right hand of the header bar.

Applicant Features Walkthrough

Once logged in you can see the job postings page. You can also see jobs applied for by clicking the view jobs applied to button. A message will display letting you know if there are no jobs when there are none applied to, none match the search, or you have applied to all jobs.

The search feature starts filtering jobs based on title and description when the term reaches a length of 3 charactors. There is also a drop down to filter by years of experience, which works with the search term to filter results. If the experience filter is applied results are sorted by jobs requiring the most experience first.

Posters Feature Walkthrough

Once logged in there is a button at the top to create a new job posting. All three fields must be filled out. Only letters, numbers, and select basic punctuatoin are allowed to prevent code being taken from the input fields. Posters are limited to 4 job postings to keep storage size down.

Once a posting has been created it will appear in a feed below. You can click on the postings you created to double check the details and see who has applied. If you want to edit or delete your posting there are also buttons at the bottom of the expaded job to do so.

