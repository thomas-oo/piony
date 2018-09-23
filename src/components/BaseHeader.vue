<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" />
        <div class="title">PIoNY</div>
        <input class="input" placeholder="Search here"/>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss"scoped>
.header {
    display: grid;
    grid-template-columns: 15% minmax(10%, 700px);
    grid-template-rows: auto 40px;
    grid-template-areas:
        "logo title"
        "logo search";
    grid-column-gap: 1em;
}
.logo {
    grid-area: logo;
    width: 100%;
    object-fit: cover;
    align-self: center;
}
.title {
    grid-area: title;
    align-self: center;
    font-size: 60px;
}
.input {
    font-size: 1em;
    grid-area: search;
    border-radius: 15px;
}
</style>
