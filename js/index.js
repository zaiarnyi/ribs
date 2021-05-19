const socialTouch = document.querySelector('.social-touch'),
	wrapper = document.querySelector('.wrapper'),
	anims = document.querySelectorAll('.anim');

socialTouch.addEventListener('click', (e) => {
	if (e.target && e.target.classList.contains('social-touch__btn')) {
		e.currentTarget.classList.toggle('active');
		document.querySelector('.touch-ribs__line').classList.toggle('active');
	}
});

function slider() {
	const wrapperSlider = document.querySelector('.slider-ribs__wrapper'),
		slidesParent = wrapperSlider.querySelector('.slider-ribs__items'),
		slides = wrapperSlider.querySelectorAll('.slider-ribs__item'),
		prevBtn = document.querySelector('.aside-ribs__pagination_prev'),
		nextBtn = document.querySelector('.aside-ribs__pagination_next'),
		dottsPagination = document.querySelector('.top-slider-ribs__pagination'),
		widthWrapper = wrapperSlider.clientWidth;


	let slideIndex = 1,
		offset = 0;
	createDotts(dottsPagination, slideIndex);

	slidesParent.style.width = 100 * slides.length + '%';
	wrapperSlider.style.width = widthWrapper + 'px';
	slides.forEach((item) => {
		item.style.width = widthWrapper + 'px';
	});

	nextBtn.addEventListener('click', () => {
		if (offset == widthWrapper * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += widthWrapper;
		}

		slidesParent.style.transform = `translateX(-${offset}px)`;
		slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;
		let numPagination = dottsPagination.querySelectorAll(
			'.top-slider-ribs__btn',
		);
		slides.forEach((item) => {
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			}
		});
		createActiveClass(slides, true);
		createActiveClass(numPagination);
	});

	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = widthWrapper * (slides.length - 1);
		} else {
			offset -= widthWrapper;
		}
		slidesParent.style.transform = `translateX(-${offset}px)`;
		slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;
		let numPagination = dottsPagination.querySelectorAll(
			'.top-slider-ribs__btn',
		);
		slides.forEach((item) => {
			if (item.classList.contains('active')) {
				item.classList.remove('active');
			}
		});
		createActiveClass(slides, true);
		createActiveClass(numPagination);
	});

	dottsPagination.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('top-slider-ribs__btn')) {
			let tabIndex = target.parentNode.getAttribute('data-dotts');
			offset = widthWrapper * (tabIndex - 1);
			slidesParent.style.transform = `translateX(-${offset}px)`;
			let parentTarget = target.closest('.top-slider-ribs__list').children;
			[...parentTarget].forEach((item, index) => {
				
				if (index + 1 != tabIndex) {
					item.firstChild.classList.remove('_scale');
				} else {
					item.firstChild.classList.add('_scale');
				}
			});
		}
	});

	function createDotts(parent, num = 1) {
		const dotts = document.createElement('ul');
		dotts.classList.add('top-slider-ribs__list');

		for (let i = 0; i < slides.length; i++) {
			const el = slides[i];
			const li = document.createElement('li'),
				button = document.createElement('button');

			button.classList.add('top-slider-ribs__btn');
			button.textContent = convertToRoman(i + 1);
			li.setAttribute('data-dotts', i + 1);
			if (i + 1 == num) {
				button.classList.add('_scale');
			}
			li.append(button);
			dotts.append(li);
		}
		parent.append(dotts);
	}

	function convertToRoman(num) {
		let roman = {
			M: 1000,
			CM: 900,
			D: 500,
			CD: 400,
			C: 100,
			XC: 90,
			L: 50,
			XL: 40,
			X: 10,
			IX: 9,
			V: 5,
			IV: 4,
			I: 1,
		};
		let str = '';

		for (var i of Object.keys(roman)) {
			var q = Math.floor(num / roman[i]);
			num -= q * roman[i];
			str += i.repeat(q);
		}

		return str;
	}

	function createActiveClass(arr) {
		arr.forEach((item, index) => {
			if (index + 1 === slideIndex) {
				item.classList.add('_scale');
			} else {
				item.classList.remove('_scale');
			}
		});
	}
}

slider();
