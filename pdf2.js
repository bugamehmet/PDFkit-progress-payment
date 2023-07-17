generateFrame(); // FRAME
function generateFrame() {
	const frameX = 15; // X coordinate of the frame's left edge
	const frameY = 50; // Y coordinate of the frame's top edge
	const frameWidth = 570; // Width of the frame
	const frameHeight = 750; // Height of the frame
	const frameThickness = 2; // Thickness of the frame in pixels

	const drawRect = (x, y, width, height, color) => {
		doc.rect(x, y, width, height).fill(color);
	};

	drawRect(frameX, frameY, frameWidth, frameThickness, '#000000'); // Top frame
	drawRect(frameX, frameY + frameHeight - frameThickness, frameWidth, frameThickness, '#000000'); // Bottom frame
	drawRect(
		frameX,
		frameY + frameThickness,
		frameThickness,
		frameHeight - 2 * frameThickness,
		'#000000'
	); // Left frame
	drawRect(
		frameX + frameWidth - frameThickness,
		frameY + frameThickness,
		frameThickness,
		frameHeight - 2 * frameThickness,
		'#000000'
	); // Right frame
}

function row1(doc, height) { // ROW FUNCTION
	doc.lineJoin('miter').rect(17.2, height, 566.3, 20).stroke();
	return doc;
}
function row2(doc, height) { // ROW2 FUNCTION
	doc.lineJoin('miter').rect(55, height, 528, 20).stroke();
	return doc;
}

function para(number, fractionDigits = 2) {  // MONEY FORMAT (Turkish Lira)
	return number.toFixed(fractionDigits).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₺';
}

connection.query('SELECT * FROM hakedis_raporu ORDER BY h_id DESC LIMIT 1 ', (error, results) => { // LAST DATA QUARY 
	if (error) {
		console.error('MySQL query error: ', error);
		return;
	}
	doc.font('Roboto-Bold.ttf').text('PROGRESS REPORT', { align: 'center' }).fontSize('14'); // TITLE 
	results.forEach((e) => {
		headerSection();
		middleSection();
		bottomSection();

		function headerSection() { // HEADER 
			row1(doc, 90);
			row1(doc, 110);
			row1(doc, 130);
			row1(doc, 150);
			row1(doc, 170);
			row1(doc, 190);
			row1(doc, 210);

			doc // ADD BORDERS AND TEXT
				.fontSize('10')
				.text(`${e.is_adi}`, 25, 65, { align: 'left' })

				.font('Roboto-Bold')
				.text(`${para(e.sozlesme_bedeli)}`, 455, 95, { align: 'left' })
				.text('C', 25, 135)
				.text('Total Amount ( A + B )', 45, 135)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 135, { align: 'left' })
				.text(`${para(e.sozlesme_bedeli)}`, 455, 155, { align: 'left' })
				.text(`${para(e.sozlesme_bedeli)}`, 455, 175, { align: 'left' })
				.text(`${para(e.sozlesme_bedeli)}`, 455, 195, { align: 'left' })
				.text('G', 25, 215)
				.text('Accrued Amount', 45, 215)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 215, { align: 'left' })
				.font('Roboto.ttf')
				.fontSize('11')
				.text('A', 25, 95)
				.text('Amount of Services Performed According to Contract Prices:', 45, 95)
				.text('B', 25, 115)
				.text('Price Difference Amount', 45, 115)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 115, { align: 'left' })
				.text('D', 25, 155)
				.text('Total Amount of the Previous Progress Payment', 45, 155)
				.text('E', 25, 175)
				.text('Amount of This Progress Payment', 45, 175)
				.text('F', 25, 195)
				.text('VAT ( E x %18 )', 45, 195);

			doc // LEFT VERTICAL LINE
				.lineCap('butt')
				.moveTo(40, 90)
				.lineTo(40, 230)
				.stroke();
			doc // RIGHT VERTICAL LINE
				.lineCap('butt')
				.moveTo(445, 50)
				.lineTo(445, 450)
				.stroke();
		}

		function middleSection() {  // MIDDLE
			row2(doc, 230);
			row2(doc, 250);
			row2(doc, 270);
			row2(doc, 290);
			row2(doc, 310);
			row2(doc, 330);
			row2(doc, 350);
			row2(doc, 370);
			row2(doc, 390);
			doc
				.save() // Save the current state of the document
				.translate(25, 400) // Set the starting point
				.rotate(-90, { origin: [0, 0] }) // Rotate the text at a certain angle
				.font('Roboto-Bold.ttf')
				.fontSize('12')
				.text('DEDUCTIONS AND WITHHOLDINGS', 0, 0)
				.restore(); // Restore the document to its previous state

			doc
				.font('Roboto-Bold.ttf')
				.text(`${para(e.sozlesme_bedeli)}`, 455, 275, { align: 'left' })
				.text(`${para(e.sozlesme_bedeli)}`, 455, 395, { align: 'left' })
				.fontSize('11')
				.font('Roboto.ttf')
				.text('a) Income/Corporate Tax ( E x % .. )', 60, 235)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 235, { align: 'left' })
				.text('b) Stamp Duty ( E - g x % ..)0,00825', 60, 255)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 255, { align: 'left' })
				.text('c) VAT Withholding (7/10)', 60, 275)
				.text('d) Social Security Institution Deduction', 60, 295)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 295, { align: 'left' })
				.text('e) Rental of Administrative Equipment', 60, 315)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 315, { align: 'left' })
				.text('f) Delay Penalty', 60, 335)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 335, { align: 'left' })
				.text('g) Advance Deduction', 60, 355)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 355, { align: 'left' })
				.text('h) Price Difference Guarantee Deduction (%6)', 60, 375)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 375, { align: 'left' })
				.text(
					'i) Administrative Fine ( As Indicated in the Report Dated 07/02/2023 Attached )',
					60,
					395
				);

			doc // LEFT VERTICAL LINE
				.lineCap('butt')
				.moveTo(55, 230)
				.lineTo(55, 410)
				.stroke();
		}

		function bottomSection() { // BOTTOM ------- E-SIGNATURE SECTION
			//underline- metnin altını çizip çizmeme
			row1(doc, 410);
			row1(doc, 430);

			doc // LEFT VERTICAL LINE
				.lineCap('butt')
				.moveTo(40, 410)
				.lineTo(40, 450)
				.stroke();

			doc.lineWidth('2').lineCap('butt').moveTo(15, 525).lineTo(585, 525).stroke();
			doc
				.font('Roboto-Bold.ttf')
				.fontSize('10')
				.text('CONTRACTOR', 275, 455, { underline: true })
				.text('INSPECTION ORGANIZATION', 260, 540, { underline: true, align: 'left' })
				.text('BRANCH DIRECTOR', 50, 650, { underline: true, align: 'left' })
				.text('DEPARTMENT HEAD', 460, 650, { underline: true, align: 'left' })
				.text('ASSISTANT GENERAL MANAGER', 235, 710, { underline: true, align: 'left' })
				.fontSize('11')
				.text('H', 25, 415)
				.text('Total Deductions and Withholdings', 45, 415)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 415, { align: 'rigth' })
				.text('I', 25, 435)
				.text('Amount to be Paid to the Contractor ( G - H )', 45, 435)
				.text(`${para(e.sozlesme_bedeli)}`, 455, 435, { align: 'left' });

			doc
				.font('Roboto.ttf')
				.fontSize('8')
				.text('|dismakamtarih1|', 270, 480)
				.text('|dismakamunvanad1|', 265, 510)
				.text('|makamtarih6|', 50, 560)
				.text('|makam6|', 55, 590)
				.text('|makamtarih5|', 270, 565)
				.text('|makam5|', 275, 595)
				.text('|makamtarih4|', 460, 565)
				.text('|makam4|', 470, 595)
				.text('|makamtarih3|', 55, 675)
				.text('|makamtarih2|', 470, 675)
				.text('|makamtarih1|', 260, 735)
				.font('Roboto-Bold.ttf')
				.text('|makam3|', 60, 705)
				.text('|makam2|', 475, 705)
				.text('|makam1|', 265, 765);
		}
	});
	doc.end();
	console.log('Progress report-2 successfully generated');
	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader('Content-Disposition', 'attachment; filename=progress_report2.pdf');
	doc.pipe(res);
});
