# newletter_website
This is my personal newsletter website project. There are lots of examples of these on the web, and this is my personal implementation using tools that I am currently learning about. The site will request users to input their name and mailing info, and post changes to a [Mailchimp](https://mailchimp.com/) account using [Mailchimp's API](https://mailchimp.com/developer/). I'll try to make the website somewhat generic and include some instructions on how to set it up for your own purposes.

# Tools Used
- Javascript
- bootstrap
- express
- node.js

A lot of these tools are new to me so if there are any tips on how to better utilize them or simplify the work, please feel free to comment. For reference, how to build this project is taught through the Udemy course [The Complete 2020 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/).

# Setup
## Clone the repo onto your machine
```
# make the directory
mkdir my_newsletter
cd my_newsletter

# clone the repository
git clone https://github.com/dwes7/newletter_website.git .

# set up npm and install tools
npm init
npm install express request body-parser
```

## Set up your private data
```
# Create the private directory to store your data
mkdir private
touch private.json

```

Edit the private.json file with the information from your Mailchimp account
```
{
  "apiKey": "your api key",
  "listId": "your list id"
}
```

# Deploy in Heroku
[Heroku](https://www.heroku.com/) is nice because it allows users to deploy at least 5 projects on their servers for free. After you've set up your own personal account, you can follow the instructions [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to deploy your website. Heroku will come up with a funny url that doesn't make any sense that you can go to visit your live newsletter webapp. In order to change the url you need to set up your project in Heroku with a domain name that you own.

## My plan
My plan is to utilize this simple newsletter sign in my personal website that I have yet to create. So stay tuned... 

