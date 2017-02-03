function bnGrid(options) {
    /*
    options:
        name: string | required | name given to the grid
            ex.: 'myDataGrid'
        containerID: string | required | id of the container object already created at html page
            ex.: 'divGridContainer'
        area: string | name of the MVC area, if exists
            ex.: 'Module'
        controller: string | required | name of the MVC controller
            ex.: 'Login'
        action: string | required | name of the MVC action
            ex.: 'ListGridData'
        addButton: button object | object for creation of the add data button
            ex.: { text: 'New' }
                 { text: 'New', action: 'CreateEditPartial' }
                 { text: 'New', controller: 'MyController', action: 'CreatePartial', popupWidth: 750 } }
                 { text: 'New', click: function () { showForm(dialogMode.Popup, 0, 'MyController', 'CreatePartial', 'New Data', myGridToReload); } }
        editButton: button object | object for creation of the edit data button
            ex.: { text: 'Edit' }
                 { text: 'Edit', action: 'CreateEditPartial' }
                 { text: 'Edit', controller: 'MyController', action: 'EditPartial', popupWidth: 750 }
                 { text: 'Edit', click: function () { showForm(dialogMode.Popup, $(this).parent().data('key-field-value'), 'MyController', 'EditPartial', 'Edit Data', myGridToReload); } }
        deleteButton: button object | object for creation of the delete data button
            ex.: { text: 'Delete' }
                 { text: 'Delete', action: 'CustomDelete' }
                 { text: 'Delete', controller: 'MyController', action: 'Delete', popupWidth: 750 }
                 { text: 'Delete', click: function () { confirmDelete($(this).parent().data('key-field-value'), '/MyController/Delete', myGridToReload); } }
        detailButton: button object | object for creation of the detail grid button
            ex.: { text: 'Detail' }
                 { text: 'Detail', action: 'DetailGridPartial' }
                 { text: 'Detail', controller: 'MyController', action: 'DetailGridPartial' }
                 { text: 'Detail', click: function () { showDetail(this '/MyController/DetailGridPartial'); } }
        multiDeleteButton: button object | object for creation of the delete data button and checkbox for selection
            ex.: { text: 'Delete Selected' }
                 { text: 'Delete Selected', action: 'CustomMultiDelete' }
                 { text: 'Delete Selected', controller: 'MyController', action: 'MultiDelete', popupWidth: 750 }
                 { text: 'Delete Selected', click: function () { confirmDelete(idArray, '/MyController/MultiDelete', myGridToReload); } }
        exportButton: button object | object for creation of the export data button
            ex.: { text: 'Export CSV' }
                 { text: 'Export CSV', action: 'CustomExportData' }
                 { text: 'Export CSV', controller: 'MyController', action: 'CustomExportData', popupWidth: 750 }
                 { text: 'Export CSV', click: function () { exportData('/MyController/CustomExportData', myGridToReload); } }
        customButtons: button object array | object for creation of the custom buttons
            ex.: { text: 'Detail', glyphicon: 'th-list', click: function () { showDetail(this, '/MyController/GridDetailPartial'); } }
        masterGridID: int | id of the master record (FK), used only with master-detail grid
            ex.: 154
        showFilter: bool | enables data filters
            ex.: true
        rowClickBehavior: string | add function to grid row (none|edit|detail)
            ex.: 'edit'
        theme: string | set the theme to be used (default|clean)
            ex.: 'clean'
        textSize: string | set text size (default|small)
            ex.: 'small'
        hideButtonLabel: bool | optional | hide the label of grid buttons
            ex.: true
        allowDragColumns: bool | optional | allow drag columns to change theis position
            ex.: true

    *****************************
    button object:
        text: string | required | display text
            ex.: 'New'
        controller: string | name of the MVC controller
            ex.: 'MyController'
        action: string | name of the MVC action
            ex.: 'DefaultPartial'
        popupWidth: int | width of the popup (min: 400px)
            ex.: 750
        additionalData: json object | additional data expected by action
            ex.: { idForeign: 1 }
                 { idForeign: 1, idOther: 2 }
        glyphicon: string | required | suffix for bootstrap glyphicons
            ex.: 'plus'
        click: function | custom function executed on button click (overrides default behavior used by controller/action)
            ex.: function () { alert('example'); }
    */
    var entryDataError = '';
    if (isValidEntryData(options.name))
        this.name = options.name;
    else
        entryDataError += 'Grid Name is required<br>';

    this.gridName = 'divGrid' + this.name;
    this.pagerName = 'gridPager' + this.name;

    if (isValidEntryData(options.containerID))
        this.containerID = '#' + options.containerID;
    else
        entryDataError += 'ContainerID is required<br>';

    //this.area = options.area;

    if (isValidEntryData(options.controller))
        this.controller = options.controller;
    else
        entryDataError += 'Controller is required<br>';

    if (isValidEntryData(options.action))
        this.action = options.action;
    else
        entryDataError += 'Action is required<br>';

    this.addButton = options.addButton;
    this.editButton = options.editButton;
    this.deleteButton = options.deleteButton;
    this.detailButton = options.detailButton;
    this.multiDeleteButton = options.multiDeleteButton;
    this.exportButton = options.exportButton;
    this.customButtons = options.customButtons;
    this.masterGridID = options.masterGridID;
    this.showFilter = options.showFilter;
    this.rowClickBehavior = options.rowClickBehavior;
    this.theme = options.theme;
    this.textSize = options.textSize;
    this.hideButtonLabel = options.hideButtonLabel;
    this.allowDragColumns = options.allowDragColumns;

    this.defaultValues = {
        confirmDeleteMessage: 'Confirma exclusão permanente do registro?',
        confirmMultiDeleteMessage: 'Confirma exclusão permanente do(s) registro(s) selecionado(s)?',
        filterPlaceholder: 'Digite aqui para filtrar os dados',
        loadDataError: 'Não foi possível carregar os dados',
        loadingMessage: 'Carregando...',
        cancelText: 'Cancelar',
        saveText: 'Salvar',
        previousText: '<',
        nextText: '>',
        createAction: 'CreatePartial',
        editAction: 'EditPartial',
        deleteAction: 'Delete',
        multiDeleteAction: 'MultiDelete',
        exportAction: 'ExportData',
        addButtonGlyphicon: 'plus',
        editButtonGlyphicon: 'pencil',
        deleteButtonGlyphicon: 'trash',
        multiDeleteButtonGlyphicon: 'trash',
        exportButtonGlyphicon: 'save',
        detailButtonGlyphicon: 'th-list',
        customButtonGlyphicon: 'th-list',
        saveButtonGlyphicon: 'floppy-disk',
        cancelButtonGlyphicon: 'remove',
        sortAscGlyphicon: 'arrow-down',
        sortDescGlyphicon: 'arrow-up',
        activeColumnLabel: 'ativo'
    };

    if (entryDataError != '') {
        clearControls(true);
        gridErrorDialog = new mDialog("modalGridLoadingError");
        gridErrorDialog.show("Grid Loading Error", entryDataError, dialogMode.Popup, dialogState.Error, [{ text: 'Ok', click: dialogButton.Close }]);
        return false;
    }

    startGrid(this);

    function startGrid(self) {
        $('#' + self.gridName).remove();
        $(self.containerID).html($('<div>', { id: self.gridName, class: 'divGrid' }));
        $(self.containerID).append($('<div>', { id: self.pagerName, style: 'text-align: center;' }));

        defaultLoad(self);
        clearControls(false);

        loadGrid(self);
    }

    function loadGrid(self) {
        var page = sessionStorage.getItem(self.name + 'gridPage');
        var sortingField = sessionStorage.getItem(self.name + 'sortField');
        var sortingOrder = sessionStorage.getItem(self.name + 'sortOrder');
        var filter = sessionStorage.getItem(self.name + 'filter');
        var customFilter = sessionStorage.getItem(self.name + 'customFilter');

        //var url = '/' + self.controller + '/' + self.action;
        //if (self.area != null && self.area != undefined && self.area != '')
        //    url = '/' + self.area + url;
        //if (sessionStorage.appPath != '/')
        //    url = sessionStorage.appPath + url;

        var postData = {
            page: page,
            sortingField: sortingField,
            sortingOrder: sortingOrder,
            filter: filter,
            masterGridID: self.masterGridID,
            customFilter: JSON.parse(customFilter)
        };

        $.ajax({
            url: createUrl(self.controller, self.action),
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: function (data) {
                if (data.success) {
                    var grid = $('#' + self.gridName);
                    grid.html('');
                    div = $('<div>', { class: 'horizontal-form' });
                    div2 = $('<div>', { class: 'form-group form-group-sm' });
                    if (self.showFilter) {
                        //div2.append($('<label>', { class: 'control-label col-md-half', style: 'margin-top: 5px;', html: 'Filtrar ' }));
                        div3 = $('<div>', { class: 'col-md-6 small', style: 'padding-left: 0;' });
                        div3.append($('<label>', { class: 'control-label', html: 'Localizar:' }));
                        div3.append($('<input>', { type: 'text', placeholder: self.defaultValues.filterPlaceholder, class: 'form-control', style: 'margin-bottom: 10px;', id: self.name + 'filter', value: sessionStorage.getItem(self.name + 'filter') }));

                        //div4 = $('<button>', { class: 'btn btn-primary btn-sm btn-side' });
                        //div4 = $('<button>', { class: 'btn btn-default btn-sm btn-side' });
                        //div5 = $('<span>', { class: 'glyphicon glyphicon-search' });
                        //div4.append(div5);

                        div2.append(div3);
                        //div2.append(div4);
                    }
                    
                    if (isValidEntryData(self.exportButton))
                        div2.append(createExportButtonButton(self));
                    if (isValidEntryData(self.multiDeleteButton))
                        div2.append(createMultiDeleteButton(self));
                    if (isValidEntryData(self.addButton) && isValidEntryData(self.addButton.text))
                        div2.append(createAddButton(self));

                    div.append(div2);
                    grid.append(div);
                    grid.append(CreateTable(self, data.result));
                    createPager(self, data.Count);

                    addGridEvents(self, data.result);

                    if (self.allowDragColumns)
                        setDragTable(self);
                }
                else {
                    clearControls(true);

                    xDialog = new mDialog('modalDialog1');
                    xDialog.show('', data.message, dialogMode.Popup, dialogState.Error, [{ text: 'Ok', click: dialogButton.Close }]);
                }
            },
            error: function (error, textStatus, errorThrown) {
                clearControls(true);
                xDialog = new mDialog('modalDialog1');
                xDialog.show(self.defaultValues.loadDataError, error.message, dialogMode.Popup, dialogState.Error, [{ text: 'Ok', click: dialogButton.Close }]);
            },
            cache: false
        });
    }

    function pageLink(page, label, active) {
        var activeClass = '';
        if (active)
            activeClass = 'active';
        var li = $('<li>', { class: activeClass });
        li.append($('<a>', { title: page, 'data-page': page, html: label }));
        return li;
    }

    function pageLinkDisabled(page) {
        var li = $('<li>', { class: 'disabled' });
        li.append($('<a>', { html: page }));
        return li;
    }

    function createPager(self, count) {

        if (sessionStorage.getItem(self.name + 'gridPage') == 0)
            sessionStorage.setItem(self.name + 'gridPage', 1);

        $('#' + self.pagerName).empty();

        if (count === 0)
            count = 1;

        if (count > 1) {
            var page = parseInt(sessionStorage.getItem(self.name + 'gridPage'));
            var nav = $('<nav>', { style: 'cursor: pointer' });
            var ul = $('<ul>', { class: 'pagination', style: 'margin-top: 0 !important;' });

            if (page > 1)
                ul.append(pageLink(page - 1, self.defaultValues.previousText));
            else
                ul.append(pageLinkDisabled(self.defaultValues.previousText));

            if (count <= 14) {
                for (var i = 1; i <= count; i++) {
                    ul.append(pageLink(i, i, i == page));
                }
            }
            else {
                if (page > 1) {
                    ul.append(pageLink(1, 1));
                }
                if ((page - 4) > 2) {
                    ul.append(pageLinkDisabled('...'));
                }
                for (var i = (page - 4) ; i < page; i++) {
                    if (i > 1) {
                        ul.append(pageLink(i, i));
                    }
                }
                ul.append(pageLink(page, page, true));
                for (var i = (page + 1) ; i <= (page + 4) ; i++) {
                    if (i < count) {
                        ul.append(pageLink(i, i));
                    }
                }
                if ((page + 4) <= (count - 1)) {
                    ul.append(pageLinkDisabled('...'));
                }
                if (page < count) {
                    ul.append(pageLink(count, count));
                }
            }

            if (page < count)
                ul.append(pageLink(page + 1, self.defaultValues.nextText));
            else
                ul.append(pageLinkDisabled(self.defaultValues.nextText));

            nav.append(ul);
            $('#' + self.pagerName).append(nav);
            $('#' + self.pagerName + ' a').click(
                function (e) {
                    var page = $(this).data('page');
                    if (page != null && page != undefined && page != '') {
                        sessionStorage.setItem(self.name + 'gridPage', parseInt(page));
                        loadGrid(self);
                    }
                }
            );

        }
    }

    function defaultLoad(self) {
        sessionStorage.setItem(self.name + 'gridPage', 0);
        sessionStorage.setItem(self.name + 'sortField', '');
        sessionStorage.setItem(self.name + 'sortOrder', sortingOrder.None);
        sessionStorage.setItem(self.name + 'filter', '');
        sessionStorage.setItem(self.name + 'customFilter', JSON.stringify({}));

        $('#' + self.gridName).html(loadingPopup(self.defaultValues.loadingMessage));
    }

    function clearControls(self, optional) {
        if (optional) {
            $('#' + self.gridName).empty();
            $('#' + self.pagerName).empty();
        }
    }

    function CreateTable(self, jsonObj) {
        var columns = new Array();
        var p = jsonObj[0];
        for (var key in p) {
            columns.push(key);
        }

        var activeColumn = null;
        var columnsAlign = new Array();
        var tableClass = 'table table-bordered table-hover btn-sm';
        var thClass = 'btn-primary';
        //var thClass = '';
        if (self.theme == 'clean') {
            tableClass = 'table table-hover';
            thClass = '';
        }
        var textSizeClass = '';
        if (self.textSize == 'small')
            textSizeClass = 'small';
        var table = $('<table>', { class: tableClass + ' ' + textSizeClass });
        var headerRow = $('<tr>');

        if (self.theme == 'clean')
            headerRow.append($('<th>', { style: 'padding: 0; width: 5px;', class: thClass }));
        for (var i = 0; i < columns.length; i++) {
            if (columns[i] != 'keyFieldValue') {
                var columnsInfo = columns[i].split('|&');
                columnsAlign.push(columnsInfo[3]);
                var sortIcon = '';
                if (sessionStorage.getItem(self.name + 'sortField') == columnsInfo[0]) {
                    var sortGlyphicon;
                    if (sessionStorage.getItem(self.name + 'sortOrder') == sortingOrder.Ascending) {
                        sortGlyphicon = self.defaultValues.sortAscGlyphicon;
                    } else {
                        sortGlyphicon = self.defaultValues.sortDescGlyphicon;
                    }
                    sortIcon = $('<span>', { class: 'glyphicon glyphicon-' + sortGlyphicon, 'aria-hidden': 'true', style: 'margin-left: 4px;' });
                }

                var thStyle = 'width: ' + parseFloat(columnsInfo[2]) * 0.9 + '%;';
                if (self.theme == 'clean')
                    thStyle += 'border: 0 !important; color: #555555;';
                var th = $('<th>', { 'data-column-name': columnsInfo[0], class: thClass, style: thStyle, html: columnsInfo[1], id: 'column' + columnsInfo[0] });
                if (self.allowDragColumns) {
                    var dragHandler = $('<div>', { 'style': 'width: 100%; height: 6px; cursor: move;', class: 'grid-drag-handle' });
                    dragHandler.append($('<div>', { 'style': 'border-left: #ccc solid 1px; border-bottom: #ccc solid 1px; border-right: #888 solid 1px; border-top: #888 solid 1px; width: 100%; height: 2px;' }));
                    dragHandler.append($('<div>', { 'style': 'width: 100%; height: 2px;' }));
                    dragHandler.append($('<div>', { 'style': 'border-left: #ccc solid 1px; border-bottom: #ccc solid 1px; border-right: #888 solid 1px; border-top: #888 solid 1px; width: 100%; height: 2px;' }));
                    th.html(dragHandler);
                    th.append(columnsInfo[1]);
                }
                th.append(sortIcon);
                headerRow.append(th);

                if (columnsInfo[0].toLowerCase() == self.defaultValues.activeColumnLabel.toLowerCase())
                    activeColumn = columns[i];

            } else {
                if (isValidEntryData(self.editButton) || isValidEntryData(self.deleteButton) || (isValidEntryData(self.detailButton) && self.theme != 'clean') || isValidEntryData(self.customButtons)) {
                    headerRow.append($('<th>', { class: thClass, style: 'width: 10%;' }));
                }
                if (isValidEntryData(self.multiDeleteButton)) {
                    var checkbox = $('<input>', {
                        type: 'checkbox',
                        class: 'checkbox',
                        id: self.name + 'SelectAll',
                        onchange: 'selectAllToggle(this, "' + self.name + '");'
                    });
                    var thMultiDelete = $('<th>', { id: 'thSelectAll', class: thClass, style: 'width: 5%;' });
                    thMultiDelete.append(checkbox);
                    headerRow.append(thMultiDelete);
                }
            }
        }
        table.append(headerRow);

        for (var j = 0; j < jsonObj.length; j++) {
            var row = jsonObj[j];

            var editButton = '';
            var rowClickEdit = false;
            if (isValidEntryData(self.editButton) && isValidEntryData(self.editButton.text)) {
                editButton = createEditButton(self);
                if (self.rowClickBehavior == 'edit')
                    rowClickEdit = true;
            }

            var detailButton = '';
            var rowClickDetail = false;
            if (isValidEntryData(self.detailButton) && isValidEntryData(self.detailButton.text)) {
                detailButton = createDetailButton(self);
                if (self.rowClickBehavior == 'detail' || self.theme == 'clean')
                    rowClickDetail = true;
            }

            var trClass = '';
            if (activeColumn != null && row[activeColumn].indexOf('checked') == -1)
                trClass = 'inactive text-inactive';
            var tr = $('<tr>', { class: trClass });
            if (self.theme == 'clean')
                tr.append($('<td>', { style: 'padding: 2.5px;', class: 'highlight' }));
            for (var k = 0; k < columns.length; k++) {
                var columnName = columns[k];
                if (columnName != 'keyFieldValue') {
                    var spanText;
                    var truncateAt = parseInt(columnName.split('|&')[4]);
                    var tdHtml = '';
                    if (truncateAt > 0 && row[columnName].length > truncateAt)
                        spanText = $('<span>', { html: row[columnName].substring(0, truncateAt) + '...', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: row[columnName] });
                    else
                        spanText = $('<span>', { html: row[columnName] });

                    var tdStyle = 'text-align: ' + columnsAlign[k] + ';';
                    if (self.theme == 'clean')
                        tdStyle += 'border-top: 1px solid #dddddd; color: #555555;';
                    var td = $('<td>', { style: tdStyle, html: spanText });
                    if (rowClickEdit)
                        td.click(self.editButtonClick);
                    if (rowClickDetail)
                        td.click(self.detailButtonClick);
                    tr.append(td);
                } else {
                    if (isValidEntryData(self.editButton) || isValidEntryData(self.deleteButton) || (isValidEntryData(self.detailButton) && self.theme != 'clean') || isValidEntryData(self.customButtons)) {
                        var td = $('<td>', { class: 'gridCommandCell', style: 'padding: 2px 4px;', 'data-key-field-value': row[columnName] });
                        if (isValidEntryData(self.editButton))
                            td.append(editButton);
                        if (isValidEntryData(self.deleteButton))
                            td.append(createDeleteButton(self));
                        if (isValidEntryData(self.detailButton))
                            td.append(detailButton);
                        if (isValidEntryData(self.customButtons)) {
                            var buttons = createCustomButtons(self);
                            for (var i = 0; i < buttons.length; i++) {
                                td.append(buttons[i]);
                            }
                        }

                        tr.append(td);
                    }
                    if (isValidEntryData(self.multiDeleteButton)) {
                        var td = $('<td>', { class: 'gridSelectCell', style: 'padding: 9px 8px;', 'data-key-field-value': row[columnName] });
                        var selectCheckbox = $('<input>', {
                            type: 'checkbox',
                            class: 'checkbox',
                            id: self.name + 'Select',
                            value: row[columnName]
                        });
                        td.append(selectCheckbox);
                        tr.append(td);
                    }
                    tr.attr('data-key-field-value', row[columnName]);
                }
            }
            if (tr.children().children(':empty').length < columns.length - 1)
                table.append(tr);
        }

        return table;
    }

    function createButton(grid, glyphicon, name, title, click) {
        var buttonClass = 'btn btn-primary';
        //var buttonClass = 'btn btn-default';
        var buttonStyle = 'margin: 1px;';
        if (grid.theme == 'clean') {
            buttonClass = 'btn';
            buttonStyle += ' background-color: transparent;';
            grid.hideButtonLabel = true;
        }
        if (grid.textSize == 'small')
            buttonClass += ' btn-sm';

        var hideText = true;


        if (grid.hideButtonLabel != true || name == grid.name + 'addButton' || name == grid.name + 'multiDeleteButton' || name == grid.name + 'exportButton' || name == 'DetailSave' || name == 'DetailCancel') {
            hideText = false;
        }
        else {
            buttonStyle += 'padding:6px 15px;'
        }

        var button = $('<button>', { type: 'button', class: buttonClass, style: buttonStyle, id: 'btnGrid' + name, title: title, click: click });
        button.append($('<span>', { class: 'glyphicon glyphicon-' + glyphicon, 'aria-hidden': 'true' }));

        if (!hideText)
            button.append('&nbsp;&nbsp;' + title);


        return button;
    }

    function createAddButton(self) {
        var addButtonClick;
        if (isValidEntryData(self.addButton.click))
            addButtonClick = self.addButton.click;
        else {
            if (!isValidEntryData(self.addButton.controller))
                self.addButton.controller = self.controller;
            if (!isValidEntryData(self.addButton.action))
                self.addButton.action = self.defaultValues.createAction;
            addButtonClick = function () { showDetailForm(this, createUrl(self.addButton.controller, self.addButton.action), self, self.addButton.additionalData); };
            //addButtonClick = function () { showForm(dialogMode.RightSidebar, 0, self.addButton.controller, self.addButton.action, '', self, self.addButton.additionalData); };
        }
        var addButton = createButton(self, self.defaultValues.addButtonGlyphicon, self.name + 'addButton', self.addButton.text, addButtonClick);
        addButton.css('margin', '20px 1px 10px 1px');
        addButton.css('float', 'right');

        return addButton;
    }

    function createEditButton(self) {
        var editButtonClick;
        if (isValidEntryData(self.editButton.click))
            editButtonClick = self.editButton.click;
        else {
            if (!isValidEntryData(self.editButton.controller))
                self.editButton.controller = self.controller;
            if (!isValidEntryData(self.editButton.action))
                self.editButton.action = self.defaultValues.editAction;
            editButtonClick = function () { showDetailForm(this, createUrl(self.editButton.controller, self.editButton.action), self, self.editButton.additionalData); };
            //editButtonClick = function () { showForm(dialogMode.RightSidebar, $(this).parent().data('key-field-value'), self.editButton.controller, self.editButton.action, '', self, self.editButton.additionalData); };
        }
        var editButton = createButton(self, self.defaultValues.editButtonGlyphicon, self.name + 'editButton', self.editButton.text, editButtonClick);
        self.editButtonClick = editButtonClick;

        return editButton;
    }

    function createDeleteButton(self) {
        var deleteButtonClick;
        if (isValidEntryData(self.deleteButton.click))
            deleteButtonClick = self.deleteButton.click;
        else {
            if (!isValidEntryData(self.deleteButton.controller))
                self.deleteButton.controller = self.controller;
            if (!isValidEntryData(self.deleteButton.action))
                self.deleteButton.action = self.defaultValues.deleteAction;
            deleteButtonClick = function () { confirmDelete($(this).parent().data('key-field-value'), createUrl(self.deleteButton.controller, self.deleteButton.action), self, self.defaultValues.confirmDeleteMessage) };
        }
        var deleteButton = createButton(self, self.defaultValues.deleteButtonGlyphicon, self.name + 'deleteButton', self.deleteButton.text, deleteButtonClick);
        self.deleteButtonClick = deleteButtonClick;

        return deleteButton;
    }

    function createMultiDeleteButton(self) {
        var multiDeleteButtonClick;
        if (isValidEntryData(self.multiDeleteButton.click))
            multiDeleteButtonClick = self.multiDeleteButton.click;
        else {
            if (!isValidEntryData(self.multiDeleteButton.controller))
                self.multiDeleteButton.controller = self.controller;
            if (!isValidEntryData(self.multiDeleteButton.action))
                self.multiDeleteButton.action = self.defaultValues.multiDeleteAction;
            multiDeleteButtonClick = function () {
                var id = [];
                $('input[id="' + self.name + 'Select"]:checked').each(function () {
                    id.push($(this).val());
                });
                confirmDelete(id, createUrl(self.multiDeleteButton.controller, self.multiDeleteButton.action), self, self.defaultValues.confirmMultiDeleteMessage);
            };
        }
        var multiDeleteButton = createButton(self, self.defaultValues.multiDeleteButtonGlyphicon, self.name + 'multiDeleteButton', self.multiDeleteButton.text, multiDeleteButtonClick);
        self.multiDeleteButtonClick = multiDeleteButtonClick;
        multiDeleteButton.css('margin', '20px 1px 10px 1px');
        multiDeleteButton.css('float', 'right');

        return multiDeleteButton;
    }

    function createExportButtonButton(self) {
        var exportButtonClick;
        if (isValidEntryData(self.exportButton.click))
            exportButtonClick = self.exportButton.click;
        else {
            if (!isValidEntryData(self.exportButton.controller))
                self.exportButton.controller = self.controller;
            if (!isValidEntryData(self.exportButton.action))
                self.exportButton.action = self.defaultValues.exportAction;
            exportButtonClick = function () {
                window.open(createUrl(self.exportButton.controller, self.exportButton.action), '_blank');
            };
        }
        var exportButton = createButton(self, self.defaultValues.exportButtonGlyphicon, self.name + 'exportButton', self.exportButton.text, exportButtonClick);
        self.exportButtonClick = exportButtonClick;
        exportButton.css('margin', '20px 1px 10px 1px');
        exportButton.css('float', 'right');

        return exportButton;
    }

    function createDetailButton(self) {
        var detailButtonClick;
        if (isValidEntryData(self.detailButton.click))
            detailButtonClick = self.detailButton.click;
        else {
            if (!isValidEntryData(self.detailButton.controller))
                self.detailButton.controller = self.controller;
            if (!isValidEntryData(self.detailButton.action))
                self.detailButton.action = self.defaultValues.editAction;
            detailButtonClick = function () { showDetail(this, createUrl(self.detailButton.controller, self.detailButton.action)); };
        }
        var detailButton = createButton(self, self.defaultValues.detailButtonGlyphicon, self.name + 'detailButton', self.detailButton.text, detailButtonClick);
        self.detailButtonClick = detailButtonClick;

        return detailButton;
    }

    function createCustomButtons(self) {
        var customButton = new Array();
        for (var i = 0; i < self.customButtons.length; i++) {
            var customButtonClick;
            if (isValidEntryData(self.customButtons[i].click))
                customButtonClick = self.customButtons[i].click;
            else {
                if (!isValidEntryData(self.customButtons[i].controller))
                    self.customButtons[i].controller = self.controller;

                if (!isValidEntryData(self.customButtons[i].action))
                    customButtonClick = '';
                else {
                    var controller = self.customButtons[i].controller;
                    var action = self.customButtons[i].action;
                    var additionalData = self.customButtons[i].additionalData;
                    customButtonClick = function () {
                        showDetailForm(this, createUrl(controller, action), self, additionalData);
                    };
                }
            }
            var glyphicon = self.defaultValues.customButtonGlyphicon;
            if (isValidEntryData(self.customButtons[i].glyphicon))
                glyphicon = self.customButtons[i].glyphicon;

            customButton.push(createButton(self, glyphicon, self.name + 'customButton' + i, self.customButtons[i].text, customButtonClick));
        }
        return customButton;
    }

    function showDetailForm(button, partialView, grid, additionalData) {
        if ($('#' + grid.gridName + ' #detailRow').length > 0) {
            $('#' + grid.gridName + ' #detailDiv').first().slideUp('slow', function () {
                $('#' + grid.gridName + ' #detailRow').remove();
                if ($(button).parent().data('key-field-value') != sessionStorage.getItem(grid.gridName + 'Id')
                    || $(button).prop('id') != sessionStorage.getItem(grid.gridName + 'Button')) {
                    loadDetailForm(button, partialView, grid, additionalData);
                }
            });
        } else {
            loadDetailForm(button, partialView, grid, additionalData);
        }
    }

    function loadDetailForm(button, partialView, grid, additionalData) {
        var id = $(button).parent().data('key-field-value');
        if (id == undefined || id == null || id == '' || id == 0) {
            var tr = $(button).parents('div').next('table').children().children(':first-child');
            var columnCount = tr.children('th').length;
            tr.before('<tr id="detailRow" style="background-color: #f9f9f9;"><td colspan="' + columnCount + '" class="detailSpace"><div id="detailDiv" style="display:none;"></div></td></tr>');
        }
        else {
            var tr = $(button).parents('tr');
            var columnCount = tr.children('td').length;
            tr.after('<tr id="detailRow" style="background-color: #f9f9f9;"><td colspan="' + columnCount + '" class="detailSpace"><div id="detailDiv" style="display:none;"></div></td></tr>');
        }

        $('#' + grid.gridName + ' #detailDiv').first().load(partialView, { id: id, additionalData: additionalData }, function (data) {

            if (data.indexOf('error-page') > 0) {
                showAlert(dialogState.Error, "Falha ao carregar configurações do módulo. Tente novamente ou entre em contato com um administrador");
            }
            else {

                $('#' + grid.gridName + ' #detailDiv').first().delay(100).slideToggle('slow');

                var saveFunction = function () {
                    loadingPopupModal('Salvando...', 'detailRow');
                    $.validator.unobtrusive.parse($('#' + grid.gridName + ' #detailDiv').first());
                    var form = $('#' + grid.gridName + ' #detailDiv form').first();
                    if (form.valid()) {

                        var submitFunction = function () {
                            $.post(form.attr('action'), form.serialize(),
                            function (data) {
                                if (data.success) {
                                    $('#' + grid.gridName + ' #detailDiv').first().slideUp('slow', function () {
                                        grid.load();
                                        showAlert(dialogState.Success, data.message);
                                    });
                                } else {
                                    showAlert(dialogState.Error, data.message);
                                    hideLoadingPopupModal();
                                }
                            });
                        };

                        if (form.find('input[type="file"]').length > 0) {
                            // upload files
                            var totalUploads = 0;
                            var erroUpload = false;

                            form.find('input[type="file"]').each(
                                function () {
                                    totalUploads++;

                                    var totalFiles = document.getElementById($(this).attr('id')).files.length;
                                    if (totalFiles > 0) {

                                        for (var i = 0; i < document.getElementById($(this).attr('id')).files.length; i++) {
                                            var file = document.getElementById($(this).attr('id')).files[i];
                                            var formData = new FormData();
                                            formData.append('FileUpload', file);
                                            formData.append('PropertyName', $(this).attr('id'));

                                            $.ajax({
                                                type: 'POST',
                                                url: createUrl('Arquivo', 'Upload'),
                                                data: formData,
                                                dataType: 'json',
                                                contentType: false,
                                                processData: false,
                                                async: false,
                                                success: function (data) {
                                                    if (data.success) {
                                                        if (totalUploads == form.find('input[type="file"]').length) {
                                                            submitFunction();
                                                        }
                                                    } else {
                                                        showAlert(dialogState.Error, data.message);
                                                        hideLoadingPopupModal();
                                                        erroUpload = true;
                                                    }

                                                },
                                                error: function (data) {
                                                    showAlert(dialogState.Error, 'Erro ao enviar arquivo.');
                                                }
                                            });
                                            if (erroUpload) {
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        if (totalUploads == form.find('input[type="file"]').length && !erroUpload) {
                                            submitFunction();
                                        }
                                    }
                                });
                        } else {
                            submitFunction();
                        }

                    }
                    else {
                        hideLoadingPopupModal();
                    }
                };

                $('form').submit(function (event) { event.preventDefault(); saveFunction(); });
                buttonDock = $('<div>', { style: 'float: right;' });
                var saveButton = createButton(grid, grid.defaultValues.saveButtonGlyphicon, 'DetailSave', grid.defaultValues.saveText, saveFunction);
                saveButton.removeClass('btn-primary');
                saveButton.removeClass('btn-default');
                saveButton.addClass('btn-success');
                buttonDock.append(saveButton);
                buttonDock.append('&nbsp;')
                var cancelButton = createButton(grid, grid.defaultValues.cancelButtonGlyphicon, 'DetailCancel', grid.defaultValues.cancelText, function () { showDetail(button, partialView) });
                cancelButton.removeClass('btn-primary');
                cancelButton.removeClass('btn-default');
                cancelButton.addClass('btn-danger');
                buttonDock.append(cancelButton);

                $('#' + grid.gridName + ' #detailDiv').first().append(buttonDock);
            }
        });

        sessionStorage.setItem(grid.gridName + 'Id', $(button).parent().data('key-field-value'));
        sessionStorage.setItem(grid.gridName + 'Button', $(button).prop('id'));
    }

    function addGridEvents(self, jsonObj) {
        $('#' + self.gridName + ' th[id!="thSelectAll"]').click(
            function (e) {
                if (sessionStorage.getItem(self.name + 'sortField') == $(this).data('column-name') && sessionStorage.getItem(self.name + 'sortOrder') == sortingOrder.Ascending) {
                    sessionStorage.setItem(self.name + 'sortOrder', sortingOrder.Descending);
                } else {
                    sessionStorage.setItem(self.name + 'sortOrder', sortingOrder.Ascending);
                    sessionStorage.setItem(self.name + 'sortField', $(this).data('column-name'));
                }
                sessionStorage.setItem(self.name + 'gridPage', 1);

                loadGrid(self);
            }
        );

        $('#' + self.name + 'filter').keyup(
            function (e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode == 13)
                    $(this).change();
            });

        $('#' + self.name + 'filter').change(
            function (e) {
                sessionStorage.setItem(self.name + 'filter', $(this).val());
                loadGrid(self);
            });

        $('[data-toggle="tooltip"]').tooltip();
    }

    function setDragTable(self) {
        if (!$('#' + self.gridName + ' table').size()) {
            window.requestAnimationFrame(setDragTable);
        }
        else {
            $('#' + self.gridName + ' table').dragtable({
                dragHandle: '.grid-drag-handle',
                persistState: function (table) {
                    if (!window.sessionStorage) return;
                    var ss = window.sessionStorage;
                    table.el.find('th').each(function (i) {
                        if (this.id != '') { table.sortOrder[this.id] = i; }
                    });
                    ss.setItem('tableorder', JSON.stringify(table.sortOrder));
                },
                restoreState: eval('(' + window.sessionStorage.getItem('tableorder') + ')')
            });
        }
    };

    bnGrid.prototype.load = function (customFilter) {
        if (customFilter != undefined && customFilter != null)
            sessionStorage.setItem(this.name + 'customFilter', JSON.stringify(customFilter));
        loadGrid(this);
    }

    function isValidEntryData(data) {
        return data != null && data != undefined && data != '';
    }
}

function showDetail(self, partialView) {
    var gridId = $(self).parentsUntil('div[id^="divContainer"]').filter('div[id^="divGrid"]').prop('id');
    if ($('#' + gridId + ' #detailRow').length > 0) {
        $('#' + gridId + ' #detailDiv').first().slideUp('slow', function () {
            $('#' + gridId + ' #detailRow').remove();
            if ($(self).parent().data('key-field-value') != undefined
                && ($(self).parent().data('key-field-value') != sessionStorage.getItem(gridId + 'Id')
                    || $(self).prop('id') != sessionStorage.getItem(gridId + 'Button'))) {
                loadDetail(self, partialView);
            }
        });
    } else {
        loadDetail(self, partialView);
    }
}

function loadDetail(self, partialView) {
    var gridId = $(self).parentsUntil('div[id^="divContainer"]').filter('div[id^="divGrid"]').prop('id');
    var columnCount = $(self).parentsUntil('table', 'tr').children('td').length;
    $(self).parentsUntil('table', 'tr').after($('<tr>', { id: 'detailRow' }).append($('<td>', { colspan: columnCount, class: 'detailSpace' }).append($('<div>', { id: 'detailDiv', style: 'display:none;' }))));
    $('#' + gridId + ' #detailDiv').first().load(
        partialView,
        { id: $(self).parent().data('key-field-value') },
        function () {
            $('#' + gridId + ' #detailDiv').first().delay(100).slideToggle('slow');
        });

    sessionStorage.setItem(gridId + 'Id', $(self).parent().data('key-field-value'));
    sessionStorage.setItem(gridId + 'Button', $(self).prop('id'));
}

var sortingOrder = {
    None: 0,
    Ascending: 1,
    Descending: 2
};

function loadingPopup(loadingMessage) {
    var panel = $('<div>', { class: 'panel panel-default', style: 'width: 160px; margin: 0 auto;' });
    var panelBody = $('<div>', { class: 'panel-body', style: 'text-align: center;' });
    var span = $('<span>', { class: 'glyphicon glyphicon-refresh glyphicon-refresh-animate' });
    panelBody.append(span);
    panelBody.append('&nbsp;&nbsp;' + loadingMessage);
    panel.append(panelBody);

    return panel;
}

function loadingPopupModal(loadingMessage, anchorId) {
    var anchor = $('body');
    if (anchorId != undefined && anchorId != null && anchorId != '')
        anchor = $('#' + anchorId);

    var modal = $('<div>', { class: 'loading-popup-modal', id: 'modalWaitPopup' });
    var panel = $('<div>', { class: 'panel panel-default', style: 'width: 160px; margin: 0 auto;' });
    var panelBody = $('<div>', { class: 'panel-body', style: 'text-align: center;' });
    var span = $('<span>', { class: 'glyphicon glyphicon-refresh glyphicon-refresh-animate' });
    panelBody.append(span);
    panelBody.append('&nbsp;&nbsp;' + loadingMessage);
    panel.append(panelBody);
    modal.append(panel);

    anchor.append(modal);
}

function hideLoadingPopupModal() {

    var modal = $('#modalWaitPopup');

    if (modal.length > 0) {
        modal.fadeOut("slow", function () {
            modal.remove();
        });
    }

}

function selectAllToggle(element, gridName) {
    var checked = $(element).prop('checked');
    $('input[id="' + gridName + 'Select"]').each(function () {
        $(this).prop('checked', checked);
    });
}
