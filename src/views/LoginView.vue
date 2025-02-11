<script setup>
</script>

<template>

    <section class="d-flex min-vh-100 position-relative" style="overflow-x: hidden;">
        <!-- Top Right Link -->
        <p class="position-absolute top-0 end-0 mt-3 me-4 text-muted">Don't have an account ?
            <a href="#" class="text-decoration-none signup-link">Sign up</a>
        </p>

        <!-- Left Side (Illustration) -->
        <div class="col-lg-6 d-none d-md-flex align-items-center justify-content-center col-illustration">
            <img src="@/assets/img/illustration_login.png" alt="Illustration" class="img-fluid">
        </div>

        <!-- Right Side (Login Form) -->
        <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
            <div class="signin-container">
                <h2 class="text-left mb-4">Sign in</h2>

                <form method="post" id="loginForm">
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class='bx bx-user'></i></span>
                        <input type="text" name="username" class="form-control" placeholder="username" required>
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class='bx bxs-lock-alt'></i></span>
                        <input type="password" name="password" class="form-control" placeholder="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 btn-lg connexion-btn">connexion</button>
                </form>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>
.signin-container {
    width: 100%;
    max-width: 400px;
}
</style>
