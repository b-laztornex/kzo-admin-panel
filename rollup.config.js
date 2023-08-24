//...........
import copy from 'rollup-plugin-copy';

//...........
export default {
	//...........
	plugins: [
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),
		// Add bootstrap files to public folder
		copy({
			targets: [
				{
					src: 'node_modules/bootstrap/dist/**/*',
					dest: 'public/vendor/bootstrap'
				}
			]
		})

		//...........
	]
};
//...........
