tinymce.PluginManager.add('p2div', function(editor) {

    const convertPToDiv = function() {

        const currentNode = editor.selection.getNode();
        const pElement = editor.dom.getParent(currentNode, 'p');
		const attrs = editor.dom.getAttribs(pElement);
		const divElement = editor.dom.create('div');
		Array.from(attrs).forEach(attr => {
			divElement.setAttribute(attr.name, attr.value);
		});

        if (pElement) {
            editor.undoManager.transact(function() {

				const attrs = editor.dom.getAttribs(pElement);
				const divElement = editor.dom.create('div');
				Array.from(attrs).forEach(attr => {
					divElement.setAttribute(attr.name, attr.value);
				});

                divElement.innerHTML = pElement.innerHTML;

                editor.dom.replace(divElement, pElement);

                editor.selection.select(divElement, true);
                editor.selection.collapse(false);
            });
        }
    };

    editor.ui.registry.addButton('p2div', {
        text: 'p2div',
        tooltip: 'paragraphe to DIV',
        onAction: convertPToDiv
    });

    editor.ui.registry.addMenuItem('p2div', {
		text: 'p2div',
		onAction: convertPToDiv
	});

    // metadata
	return {
		getMetadata: () => ({ name: 'P2div' })
	};

});