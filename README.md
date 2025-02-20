## Notes for Phantom by Lukas Skerlik

technology used:
Next.js, TypeScript, TailwindCSS, React Hook Form, hosted on Vercel.

Design is simplistic but functional, I used a color scheme that is similar to one of the default Vite color schemes.
I used context to store the state of the links array when moving between pages. This is not usually necessary, as we usually hold this sort of information on the BE.
I used react-hook-form for the form and made simple pagination from scratch. The pagination was a lot more effort than it was worth, and I would probably use a dedicated package for it next time and adapt it as needed, as I did with react-hook-form, rather than trying to reinvent the wheel...

I also added 2 debug buttons, these add 50 and 500 links, respectively. I added these so that the functionality of the pagination can be shown off easily.

limitations/future improvements:

There are 3 main areas that I can think of as limiting and/or having potential for future improvement.

1. Validation of the URL:

I found this to be relatively challenging, as there are multiple snags and edge cases that need to be considered and I couldn't quite figure out a simple, all-encompassing solution.
Checking whether the input is in the form of a URL is relatively simple, using the vanilla JS URL function. However this doesn't accommodate for the fact that people don't usually write out https:// before inputting links and the URL function returns false if the user doesn't include these. I also considered adding the https:// as part of the function if it was missing.
The best method I found was to attempt to call the link using fetch, however this runs into CORS issues.
In the end I decided to leave it as is and remove the fetch check as, ideally, in a real-world example we would be storing the list of links on BE and we could simply implement this functionality on BE without running into CORS issues, displaying an error message if validation fails on BE. This validation would need to be implemented on BE either way, for security reasons.
As such, this would be an area of future improvement. I also spent too much time on this feature at this point and moved on to other ones.

2. Unit tests

I simply ran out of time to cover the codebase with unit tests. Also, as this test seemed more focused on styling as well as knowledge of Next.js rather than on react-testing-library or jest, I opted to spend more time on other parts of the site.

3. Styling

When working as a developer, I am usually provided with a design made by a designer. I think the design I came up with is not bad per se, however I believe a design made by a designer is generally of a higher quality than one made on the fly by a developer. As such, definitely room for improvement there.

I spent roughly 4 hours working on this assignemnt, plus about 20 minutes writing this document.