<template>
  <div class="footer_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h3 class="footer_text">Information</h3>
          <div class="footer_menu">
            <ul>
              <li><a href="#">About US</a></li>
              <li><a href="#">Press Centre</a></li>
              <li><a href="#">Best Price Guarantee</a></li>
              <li><a href="#">Travel News</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <h3 class="footer_text">Address</h3>
          <p class="dummy_text">
            There are many variations of passages of Lorem Ipsum
          </p>
          <h5 class="phone_text">Phone Number :</h5>
          <p class="number_text"><a href="#">+01 1234567890</a></p>
          <h5 class="phone_text">Email :</h5>
          <p class="number_text"><a href="#">demo@gmail.com</a></p>
        </div>
        <div class="col-md-4">
          <h3 class="footer_text">Newsletter</h3>
          <div class="form-group">
            <textarea
              class="update_mail"
              placeholder="Enter Your Email"
              rows="5"
              id="comment"
              name="Enter Your Email"
            ></textarea>
            <div class="subscribe_bt"><a href="#">Subscribe</a></div>
          </div>
          <div class="footer_social_icon">
            <ul>
              <li>
                <a href="#"
                  ><i class="fa fa-facebook" aria-hidden="true"></i
                ></a>
              </li>
              <li>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              </li>
              <li>
                <a href="#"
                  ><i class="fa fa-linkedin" aria-hidden="true"></i
                ></a>
              </li>
              <li>
                <a href="#"
                  ><i class="fa fa-instagram" aria-hidden="true"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- footer section end -->
  <!-- copyright section start -->
  <div class="copyright_section">
    <div class="container">
      <p class="copyright_text">
        2020 All Rights Reserved. Design by
        <a href="https://html.design">Free Html Templates</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "the-footer",
  data() {
    return {};
  },
});
</script>

<style></style>
