import React from "react";
import "./HomePage.css";


const HomePage = () => {

  return (
    <>
      <div>
        <h1 className="text-center" style={{ marginTop: "2rem", textShadow: '5px 5px 9px grey'}}>
          Welome To Mail Box, Working with Mails <br /> Made Easy For You.
        </h1>
      </div>

      <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-item-start order-lg-first order-last">
              <p className="main-hero-para">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusamus officiis nostrum, fuga iusto commodi corporis maiores
                nisi numquam placeat incidunt natus aliquam deserunt magni iure
                quibusdam. Dolore ipsum temporibus reiciendis culpa, est quod
                nam exercitationem quis officiis ratione praesentium deserunt!
                Necessitatibus blanditiis rerum, cupiditate a illo perferendis
                repellendus explicabo voluptates distinctio laboriosam, cumque
                molestias! Qui, est corrupti! Optio beatae repellendus molestias
                sequi corrupti qui sapiente totam velit magnam ipsum ex,
                delectus vel! Unde odio quisquam commodi maiores fuga esse quas,
                nihil quo fugit dolorum laborum hic architecto asperiores fugiat
                sequi cupiditate non mollitia reiciendis impedit ab natus! Quam,
                aut iusto?
              </p>
            </div>
            {/*main header right side*/}
            <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center align-item-center main-herosection-images order-md-first order-sm-first">
              <img src="../../images/hero1.jpg" alt="img" className="img-fluid" />
              <img
                src="../../images/hero2.jpg"
                alt="img"
                className="img-fluid main-hero-img2"
              />
            </div>
          </div>
        </section>
      </header>

      <section>
        <div className="work-container container">
          <h1 className="main-heading text-center">How does it Work</h1>
          <div className="row">
            <div className="col-12 col-lg-4 text-center work-container-subdiv">
              <h3 className="sub-heading">Why do I need to track my expenses?</h3>
              <p className="main-hero-para w-100">Keeping track of expenses is also useful in knowing the average amount of daily, weekly, and monthly expenses. So, if you spend more than normal, it will be easy to evaluate it. In the end, your money will be used for necessary items only and can even be allocated for saving or investment.</p>
            </div>

            <div className="col-12 col-lg-4 text-center work-container-subdiv">
              <h3 className="sub-heading">Why should I use this Expense Tracker</h3>
              <p className="main-hero-para w-100">We Provide you best and easy experience of tracking expenses daily. You can track total amount and add category wise your expenses. We Provide Free Service, hence some of the features are available with paid one but you can use free for your daily track. Explore our app you will surely get satisfy.</p>
            </div>

            <div className="col-12 col-lg-4 text-center work-container-subdiv">
              <h3 className="sub-heading">How to use this Expense Tracker, Easily</h3>
              <p className="main-hero-para w-100">Just click on Track in Navbar then you will redirect to page where you can track and manage your daily expenses. Just enter amount of each category for which you spent and write description about it whatever you want like why it spent etc.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
