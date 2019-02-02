const Normalizer = require('./normalizer');
const fs = require('fs');
// config
const path_to_citi_field = './manifests/citifield_sections.csv';
const path_to_dodger_field = './manifests/dodgerstadium_sections.csv';

const path_to_citi_sample = './test/sample_citi.csv';
const path_to_dodger_sample = './test/sample_dodger.csv';

const path_to_field = path_to_citi_field;
const path_to_sample = path_to_citi_sample;

let normalizer = new Normalizer();
normalizer.read_manifest(path_to_field);




// grading
let grade = 0;

let normalizable_correct = 0;
let normalizable_invalid = 0;
let normalizable_incorrect = 0;

let non_normalization_correct = 0;
let non_normalization_incorrect = 0;
// run through sample
let data = fs.readFileSync(path_to_sample);
let arr = data.toString().split('\n');

for(let i = 1; i < arr.length; i++) {
	let [section, row, res_section_id, res_row_id, valid] = arr[i].split(',');

	let my_result = normalizer.normalize(section, row);


	if(valid === 'True') {
		if(my_result[2]) {
			if(res_section_id === my_result[0] && res_row_id === my_result[1]) {
				grade++;
				normalizable_correct++;
			} else {
				grade -= 5;
				normalizable_incorrect++;
			}
		} else {
			normalizable_invalid++;
		}
	} else {
		if(my_result[2]) {
			grade -= 5;
			non_normalization_incorrect++;
		} else {
			grade++;
			non_normalization_correct++;
		}
	}
}

//console.log('correct', normalizable_correct, non_normalization_correct);
//console.log('all right', normalizable_invalid);
//console.log('INCORRECT!!!', normalizable_incorrect, non_normalization_incorrect);
console.log(grade);










