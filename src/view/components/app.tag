<app>
	<script>
		import route from 'riot-route'
		this.on('mount',()=>{
			route((screen, action, other) => {
				if (!screen) { screen = 'index-page' }

				riot.mount(this.refs.mount_point, screen, {route:{screen:screen, action:action, other:other}})
			})
		})
	</script>

	<div class="wrapper">

	    <header class="header">
			
			<div class="logo">
				<a class="logo-link" href="#">
					<img class="logo-img" src="/img/logo.png" alt="Dao Casino"/>
				</a>
			</div>

			<div class="switch">
				<form class="switch-form">

					<label class="switch-label">
						TESTNET
						<div class="switch-shadow"></div>
						<input class="switch-input" type="radio" name="switch_network" chacked>
					</label>

					<label class="switch-label">
						<input class="switch-input" type="radio" name="switch_network">
						<div class="switch-shadow"></div>
						MAINNET
					</label>

				<form>
			</div>

		</header>

		<section id="app" ref="mount_point"></section>
	</div>


	<style type="less">

		.wrapper {
			max-width: 1200px;
		}

		.switch-input {
			display: none;
		}

		.switch-shadow {
			width: 35px;
			height: 15px;
		}

	</style>
</app>