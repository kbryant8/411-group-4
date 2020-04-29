from flask import Flask, render_template, request

app = Flask(__name__)


#first page that collect user's name
@app.route('/', methods = ['POST'])
def home():
    name = request.form['username'] #get the user name
    return render_template('home.html')


#then go to the second page after login and ask for the playlist's link
@app.route('/login', methods = ['POST'])
def login():
    link = request.form['link'] #the link
    return render_template('login.html')

#the sorting page
@app.route('/sort')
def sort():
   '''#get the info base on the api'''
   #this is a random name of the return and it should based on the database and I think we can use mysql function
    return sorting_list()

#sort another playlist
@app.route('/re_sort')
def re_sort():
    return render_template('login.html')





if __name__ == '__main__':
    app.run(debug=True)
