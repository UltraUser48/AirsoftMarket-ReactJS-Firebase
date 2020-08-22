import React from 'react'


const ErrorPage = () => {
  return (
 
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                   The page which you have requested was not found !
                   <br/>
                </div>
                <br/>
                <div class="error-actions">
                    <a href="/" class="btn btn-warning btn-lg"><span class="glyphicon glyphicon-home"></span>
                        Take Me Home </a><a href="/" class="btn warning btn-lg"><span class="glyphicon glyphicon-envelope"></span></a>
                </div>
            </div>
        </div>
    </div>
</div>
  
  )
}

export default ErrorPage;