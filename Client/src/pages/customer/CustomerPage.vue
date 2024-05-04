<template>
  <div class="container">
    <div class="customer row">
      <div class="col-6">
        <h3>Thông tin tài khoản</h3>
        <div class="row">
          <div class="col-4">Tên đăng nhập</div>
          <div class="col-4">{{ userInfo.username }}</div>
        </div>
        <div class="row">
          <div class="col-4">Tên đầy đủ</div>
          <div class="col-4">{{ userInfo.fullName }}</div>
        </div>
        <div class="row">
          <div class="col-4">Số điện thoại</div>
          <div class="col-4">{{ userInfo.phoneNumber }}</div>
        </div>
        <div class="row">
          <div class="col-4">Địa chỉ</div>
          <div class="col-4">{{ userInfo.address }}</div>
        </div>
      </div>
      <div class="col-6">
        <h3>Thông tin vé</h3>

        <div class="card w-100 mb-3" v-for="ticket in tickets" :key="ticket._id">
          <div class="card-body">
            <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/bus--v1.png" alt="bus--v1" />
            <div class="card-content">
              <h3>{{ ticket.scheduleId.routeId.name }}</h3>

              <span
                >Giá vé: <strong>{{ convertPrice(ticket.price) }}</strong></span
              >
              <span
                >Thời gian xuất bến: <strong>{{ formatDateFromTimestamp(ticket.scheduleId.startTime) }}</strong></span
              >
              <span
                >Địa điểm đón: <strong>{{ ticket.pickupLocation }}</strong></span
              >
              <span
                >Số điện thoại liên hệ: <strong>{{ ticket.phoneContact }}</strong></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { HOST_BOOKING_SERVICE } from "@/services/getAPI";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  //
  setup() {
    const tickets = ref([]) as any;
    const userInfo = computed(() => {
      const storedUserInfo = localStorage.getItem("userInfo");
      return storedUserInfo ? JSON.parse(storedUserInfo) : {};
    });

    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${HOST_BOOKING_SERVICE}/api/ticket?customerId=${userInfo.value.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch route data");
        }

        const data = await response.json();
        tickets.value = data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchedule();

    const formatDateFromTimestamp = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };

    const convertPrice = (price) => {
      // Làm tròn giá thành số nguyên
      const roundedPrice = Math.round(price);
      // Sử dụng toLocaleString để thêm dấu phẩy
      return roundedPrice.toLocaleString();
    };

    return { userInfo, tickets, convertPrice, formatDateFromTimestamp };
  },
});
</script>

<style lang="scss" scoped>
.container {
  mim-height: 80vh;
}
img {
  width: 100px;
  margin-right: 3em;
}
.card-body {
  display: flex;
}
.card-content {
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
}
</style>
