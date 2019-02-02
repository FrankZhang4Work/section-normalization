const fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
	return this.split(search).join(replacement);
};

function Normalizer() {
	// private fields and functions
	let map;

	let getContiuousNumber = (str) => {
		for(let sub of str.split(' ')) {
			if(!isNaN(sub)) {
				return Number(sub);
			}
		}

		return 0;
	};

	let getContiuousNumberWithoutSpace = (str) => {
		str = str.replaceAll(' ', '');

		let start = 0; 

		while(str[start] && isNaN(str[start])) {
			start++;
		}

		let end = start;

		while(!isNaN(str[end])) {
			end++;
		}

		if(start < str.length && end >= start) {
			return Number(str.substring(start, end));
		}
		return 0;
	};

	let createNewSection = (id, name, key, val) => {
		let section = {
			section_name: name,
			section_id: id,
			row_map: {}
		}

		section.row_map[key] = val;

		return section;
	};
	// init
	this.read_manifest = (path_to_manifest) => {
		// clear map to parse the new map
		map = {};

		let data = fs.readFileSync(path_to_manifest);
		let arr = data.toString().split('\r\n');

		for(let i = 1; i < arr.length; i++) {
			let [sectionId, sectionName, rowId, rowName] = arr[i].split(',');

			let sectionNumber = getContiuousNumber(sectionName);

			if(sectionNumber) {
				let sections = map[sectionNumber];
				let section;

				if(sections && sections.length) {
					let found = false;

					for(section of sections) {
						if(section && section.section_name === sectionName && section.section_id == sectionId) {
							found = true;
							section.row_map[rowName] = rowId;
							break;
						}
					}

					if(found) {
						continue;
					}
				}

				sections = sections || [];
				sections.push(createNewSection(sectionId, sectionName, rowName, rowId));
				map[sectionNumber] = sections;
			}
		}

		return;
	};
	/*
	 * @param string section The section description
     * @param string row|null The row name
     * @return array [section_id, row_id, valid]
	 */
	this.normalize = (section_name, row_name) => {
		let section_number = getContiuousNumberWithoutSpace(section_name);

		if(section_number) {
			let sections = map[section_number];

			if(sections && sections.length === 1) {
				let section = sections[0];
				let row_map = section.row_map;

				if(row_map) {
					let row_id = row_map[row_name];
					
					if(row_id) {
						return [section.section_id, row_id, true];
					}
				}
			} else {
				// do something here to achieve a better score on dodger stadium
			}
		}

		return false;
	}
	// for debugging
	this.printMap = () => {
		console.log(map);
	}
}

module.exports = Normalizer;





