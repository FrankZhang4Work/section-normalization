# Section Normalization

## Config and Grade

```
in app.js, change 'path_to_field' and 'path_to_sample' variable
> node app
> The Score will be displayed in the console
```

## How much score I got
Citi: 999
Dodger: 338
!No incorrect normalizable tickets!

### In the first half an hour
This is a really hard problem, I think the ultimate solution will be training a learning machine in certain way to understand the validity. 
Since I got only two hours here, I need to make some tradeoffs, and my ultimate goal is to achieve a better score.
### However
But it's really bad that a non-existing ticket will be displayed.
If I were the buyer, I bought the ticket and I found that this is an invalid ticket!! I'll be totally pissed off! 
So I told myself that it's okay to waste some tickets but it's intolerable to show an invalid ticket!
### My solution in an hour
I need a data structure to help me solve the problem and it will be like this:
(notice section_number is the number in the section_name, for exmaple, 'Promenade Level 425' is 425)
```json
{
    "<section_number>" : [
        {
            "section_name": "Reserve 17",
            "section_id": "224",
            "row_map": {
                "row_name" : "row_id"
            }
        },
        {...},
        ...
    ]
```
With the help of this data structure, it takes only constant time to process each row of incoming tickets in different format. 
I made a tradeoff here that, if there are multiple sections associated to the same section number, I throw this ticket away. This tradeoff makes sure that there is no invalid tickets being shown and also it allowed me to complete this task on time.
### Last hour
Since I'm programming in node.js, so I wrote myself a grader (app.js) to grade my score and I wrote this README file.

## Overall Speaking
I spent two and a half hour on this case and it was a great fun!!!
## To Do 
By dealing with the multiple sections with the same section_number, I believe that I can achieve a better score in Dodger Stadium.


