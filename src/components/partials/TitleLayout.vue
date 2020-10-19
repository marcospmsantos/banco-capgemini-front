<template>
	<div>
		<h1 class="font-title">{{ text }}</h1>
	</div>
</template>

<script>
export default {
	name: 'TitleLayout',
	props: ['text'],
};
</script>
<style>
.font-title {
	color: #3c5a99;
	font-family: 'Great Vibes', cursive;
	font-size: 40px;
	font-weight: bold;
	margin-bottom: 0px;
	text-align: center;
	text-shadow: 0 1px 1px #fff;
}
</style>
