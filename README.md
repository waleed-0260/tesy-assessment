TECH STACK USED IN THIS PROJECT:

- **Next.js 14 (App Router)**
- **TypeScript**
- **Shadcn UI**
- **Tailwind CSS**
- **Framer Motion**

I read all the comments in the figma try to analyze them and search about the purpose of each comment behind this app than I try to implement them in code the gif and the images used in figma I've used the same in this project and actually these images and gif are having the black background that makes the overall project looks bad because of the colors.

MAJOR ISSUE:
I was wondering how the dashbaord will open in the page like in the figma first page there is a loading sekelton page and in that page there is the dashbaord shown so I think about that ask about this from claude and the answer I got was to impelement that dashbaord inside the  app only so I did and on click on each honeycomb icon I've made a flight animation it was very difficult to find out what that comment say how it si giving example of the inbox floating animaation affect etc but what I got best I implement this.

The next main part was the APIs and data fetching   I've implemented the dummyjson API and make the conversations data dynamic as possible sues dynamic fetchign for single conversations and fetcehd all users for the list made a single file api.ts where all the data fetching functions are working then fetches this data and maps this data according to the project in the conversations file the next step is to show the data at the main page and show in the components for that I had to make an async function than I have use it in the complete app.


In this complete design and comments the major thing that takes me too much time to udnerstand was the flying aniamtion of these honeycomb icons to the dashboard and affect of the honeycomb hover and how the dashbaord will be displayed. for all the honeycomb icon I HAVE made a different section but that section is static it is only dummy data 


I think I can optimzie the code for the API by just fetching the data once at the page.tsx file and store the data in a store or somewhat and use them wherever I need but currently I Have implemented the other safer way as per the project requirements 
