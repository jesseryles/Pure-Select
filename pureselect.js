var selectOptions = {
	styleSelect: function() {
		var selects = document.querySelectorAll('select');

		if(selects.length > 0) {
			for(var i = 0; i <= selects.length; i++){
				if(selects[i]) {
					selects[i].style.display = 'none'
					var classList = selects[i].classList
					var selectOptions = selects[i].querySelectorAll('option')
					var selectName = selects[i].name
					var selectedIndex = selects[i].selectedIndex

					if(selectOptions.length > 0)
						var optionsStart = '<ul class="select-options">'
						var optionsList = ''



						for(var x = 0; x <= selectOptions.length; x++)	{
							if(selectOptions[x]) {
								var optionContent = selectOptions[x].innerHTML
								var optionValue = selectOptions[x].value
								var optionClass = selectOptions[x].classList

								if(x == selectedIndex) {
									var selectedClass = selectOptions[selectedIndex].classList
									var selectedValue = '<span class="select-rendered '+selectedClass+'" data-name="'+selectName+'">'+optionContent+'</span><span class="dropdown-arrow"></span>'
									optionsList = optionsList + '<li class="select-option selected '+optionClass+'" data-value="'+optionValue+'" data-name="'+selectName+'" data-index="'+x+'">'+optionContent+'</li>'
								} else {
									optionsList = optionsList + '<li class="select-option '+optionClass+'" data-value="'+optionValue+'" data-name="'+selectName+'" data-index="'+x+'">'+optionContent+'</li>'
								}
							}
						}

						var optionsEnd = '</ul>'

					selects[i].insertAdjacentHTML('afterend', '<div class="select-dropdown '+classList+'">' + selectedValue + optionsStart + optionsList + optionsEnd + '</div>');
				}
			}

			var selectDropdown = document.querySelectorAll('.select-dropdown')
			
			Array.prototype.forEach.call(selectDropdown, function(currentDropdown, i){
				var max_w = 0;
				var selectRendered = currentDropdown.querySelectorAll('.select-rendered');
				var selectOption = currentDropdown.querySelectorAll('.select-option');

				currentDropdown.addEventListener("click", function(event){
					utility.toggleClass(this, 'dropdown-active')

				});

				document.addEventListener('click', function(event) {
				  var isClickInside = currentDropdown.contains(event.target);

				  if (!isClickInside) {
				    utility.removeClass(currentDropdown, 'dropdown-active')
				  }
				});


				Array.prototype.forEach.call(selectOption, function(el, i){

					if(max_w < el.offsetWidth) {
						max_w = el.offsetWidth;
					}

					el.addEventListener("click", function(){
						var selectOptionName = this.getAttribute('data-name')
						var selectOptionValue = this.getAttribute('data-value')
						var selectOptionIndex = this.getAttribute('data-index')
						var selectOptionClass = this.classList['value']
						var targetContainer = utility.findAncestor(this, 'select-dropdown') 
						var targetSelect = targetContainer.previousElementSibling;
						var targetRender = targetContainer.querySelectorAll('.select-rendered[data-name="'+selectOptionName+'"]')
						var targetOptions = targetContainer.querySelectorAll('.select-option[data-name="'+selectOptionName+'"]')
						targetSelect.selectedIndex = selectOptionIndex
						targetRender[0].innerHTML = this.innerHTML

						var event = document.createEvent('HTMLEvents');
						event.initEvent('change', true, false);
						targetSelect.dispatchEvent(event);
						
						for(y = 0; y <= targetOptions.length; y++){
							if(targetOptions[y]) {
								if(this === targetOptions[y]) {
									utility.addClass(this, 'selected')
									targetRender[0].classList =  'select-rendered ' + selectOptionClass
								} else {
									utility.removeClass(targetOptions[y], 'selected')
								}
							}
						}
					});
				})

				currentDropdown.style.minWidth = max_w+'px';
			})


		}				
	},

}	


var utility = {
	toggleClass: function(el, className){
		if (el.classList) {
		  el.classList.toggle(className);
		} else {
		  var classes = el.className.split(' ');
		  var existingIndex = classes.indexOf(className);

		  if (existingIndex >= 0)
		    classes.splice(existingIndex, 1);
		  else
		    classes.push(className);

		  el.className = classes.join(' ');
		}
	},

	addClass: function(el, className) {
		if (el.classList)
		  el.classList.add(className);
		else
		  el.className += ' ' + className;
	},

	removeClass: function(el, className){
		if (el.classList)
		  el.classList.remove(className);
		else
		  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	},

	findAncestor: function(el, cls) {
	    while ((el = el.parentElement) && !el.classList.contains(cls));
	    return el;
	},
}