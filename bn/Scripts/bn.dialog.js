// Classe para caixa de diálogo
function mDialog(name) {

    this.name = name;
    this.id = '#' + name;

    // função interna que limpa o conteúdo
    function emptyModalDialog(self) {
        $(self.id + ' div div').html('');
        $(self.id + ' div p.modalFooter').html('');
    }

    // função interna que preenche o conteúdo
    function setModalDialogContent(self, title, content, buttons) {
        $(self.id + ' div div').append($('<h4>', { html: title }));
        $(self.id + ' div div').append($('<p>', { html: content }));

        if (buttons != null && buttons != undefined) {
            var p = $('<p>');
            for (var i = 0; i < buttons.length; i++) {
                var buttonClick
                if (buttons[i].click == dialogButton.Close)
                    buttonClick = function () { self.hide() };
                else
                    buttonClick = buttons[i].click;
                var buttonColorClass = 'btn-primary';
                if (buttons[i].text == 'Salvar' || buttons[i].text == 'Excluir')
                    buttonColorClass = 'btn-success';
                if (buttons[i].text == 'Cancelar')
                    buttonColorClass = 'btn-danger';
                p.append($('<input>', { type: 'button', class: 'modalButton btn ' + buttonColorClass, id: 'btnModalDialog' + self.name + i, value: buttons[i].text, click: buttonClick }));
            }
            p.append($('<br>'));
            $(self.id + ' div p.modalFooter').append(p);
        }
    }

    // função interna que remove uma classe da caixa de diálogo
    function removeClass(self, modeClass) {
        $(self.id + ' div').removeClass(modeClass);
    }

    // função interna que adiciona uma classe da caixa de diálogo
    function addClass(self, modeClass) {
        $(self.id + ' div[class!="modalBackground"]').addClass(modeClass);
    }

    // função interna que remove todos as classes de estilo de Modo
    function removeAllModes(self) {
        removeClass(self, 'ribbon');
        removeClass(self, 'left-sidebar');
        removeClass(self, 'right-sidebar');
        removeClass(self, 'popup');
    }

    // função interna que define uma classe de estilo de Modo
    function setModalDialogMode(self, mode) {
        removeAllModes(self);
        switch (mode) {
            case dialogMode.Ribbon:
                addClass(self, 'ribbon');
                break;
            case dialogMode.LeftSidebar:
                addClass(self, 'left-sidebar');
                break;
            case dialogMode.RightSidebar:
                addClass(self, 'right-sidebar');
                break;
            case dialogMode.Popup:
                addClass(self, 'popup');
                break;
            default:
                addClass(self, 'ribbon');
        }
    }

    // função interna que remove todos as classes de estilo de Modo
    function removeAllStates(self) {
        removeClass(self, 'information');
        removeClass(self, 'warning');
        removeClass(self, 'error');
    }

    // função interna que define uma classe de estilo de Estado
    function setModalDialogState(self, state) {
        removeAllStates(self);
        switch (state) {
            case dialogState.Information:
                addClass(self, 'information');
                break;
            case dialogState.Warning:
                addClass(self, 'warning');
                break;
            case dialogState.Error:
                addClass(self, 'error');
                break;
            default:
                addClass(self, 'information');
        }
    }

    // Método público que exibe o popup, utilizado pela aplicação
    mDialog.prototype.show = function (title, content, mode, state, buttons, width) {
        var self = this;
        $(self.id).remove();
        $('body').append($('<div>', { id: self.name, class: 'modalDialog' }));
        var div1 = $('<div>');
        $(div1).append($('<div>'));
        $(div1).append($('<p>', { class: 'modalFooter' }));
        $(self.id).append(div1);
        //$(self.id).append($('<div>', { class: 'modalBackground', click: function () { self.hide() } }));
        $(self.id).append($('<div>', { class: 'modalBackground' }));

        emptyModalDialog(self);

        setModalDialogContent(self, title, content, buttons);

        setModalDialogMode(self, mode);

        setModalDialogState(self, state);

        var divLeftSidebar = $(self.id + " > div.left-sidebar");
        if (divLeftSidebar.length > 0) {
            divLeftSidebar.css("left", $(document).width() * -1);
            $(self.id + " > div.left-sidebar > div").css("max-height", $(window).height() - 70);
            $(self.id).fadeIn(300, function () {
                var divLeftSidebar = $(self.id + " > div.left-sidebar");
                var sidebarWidth = divLeftSidebar.width();
                divLeftSidebar.css("left", sidebarWidth * -1);
                divLeftSidebar.animate({ left: '+=' + sidebarWidth }, (sidebarWidth * 0.85))
            });
            return;
        }

        var divRightSidebar = $(self.id + " > div.right-sidebar");
        if (divRightSidebar.length > 0) {
            divRightSidebar.css("left", $(document).width());
            $(self.id + " > div.right-sidebar > div").css("max-height", $(window).height() - 70);
            $(self.id).fadeIn(300, function () {
                var divRightSidebar = $(self.id + " > div.right-sidebar");
                var sidebarWidth = divRightSidebar.width();
                divRightSidebar.animate({ left: '-=' + sidebarWidth }, (sidebarWidth * 0.85))
            });
            return;
        }

        var divPopup = $(self.id + " > div.popup")
        if (divPopup.length > 0 && width != null && width != undefined) {
            divPopup.css("width", width + 40);
        }
        $(self.id).fadeIn(300);
    }

    // Método público que oculta o popup, utilizado pela aplicação
    mDialog.prototype.hide = function () {
        var self = this;
        if ($(self.id + " > div.right-sidebar").length > 0) {
            $(self.id + " > div.right-sidebar").animate({ left: '+=' + ($(self.id + " > div.right-sidebar").width()) }, ($(self.id + " > div.right-sidebar").width() * 0.85), function () { $(self.id).fadeOut(300, function () { $(self.id).remove() }) });
        } else if ($(self.id + " > div.left-sidebar").length > 0) {
            $(self.id + " > div.left-sidebar").animate({ left: '-=' + ($(self.id + " > div.left-sidebar").width()) }, ($(self.id + " > div.left-sidebar").width() * 0.85), function () { $(self.id).fadeOut(300, function () { $(self.id).remove() }) });
        } else {
            $(self.id).fadeOut(300, function () { $(self.id).remove() })
        }

    }
}

function showForm(mode, id, controller, action, title, grid, additionalData, popupWidth) {
    var dialogName = 'modalForm' + id;
    var content = $('<div>', { id: 'divForm' });
    content.append(loadingPopup('Carregando...'));
    xDialog = new mDialog(dialogName);
    xDialog.show(title, content, mode, dialogState.Information,
        [
            {
                text: 'Salvar',
                click: function () {
                    $.validator.unobtrusive.parse($('#divForm'));
                    var form = $('#divForm form');
                    if (form.valid()) {
                        $.post(form.attr('action'), form.serialize(),
                        function (data) {
                            zDialog = new mDialog('modalForm' + id + '2');
                            if (data.success) {
                                xDialog.hide();
                                if (grid != null && grid != undefined)
                                    grid.load();
                                if (data.redirectTo != null && data.redirectTo != undefined)
                                    window.location.replace(data.redirectTo);
                                showAlert(dialogState.Success, data.message);
                            } else {
                                if (grid != null && grid != undefined)
                                    grid.load();
                                showAlert(dialogState.Error, data.message);
                            }
                        });
                    }
                }
            },
            { text: 'Cancelar', click: dialogButton.Close }
        ]
    );

    //var globalID;
    //repeatOften = function () {
    //    if ($('#divForm').length == 0)
    //        globalID = requestAnimationFrame(repeatOften);
    //    else
    //        cancelAnimationFrame(globalID);
    //}

    $('#divForm').load(createUrl(controller, action), { id: id, additionalData: additionalData },
        function (data, status, xhr) {
            if (status == "error") {
                xDialog.hide();
                showAlert(dialogState.Error, data.message);
            } else {
                var divPopup = $('#' + dialogName + ' > div.popup');
                if (divPopup.length > 0 && popupWidth != null && popupWidth != undefined) {
                    divPopup.css("width", popupWidth);
                }
            }
        }
    );
}

function showPopup(dialogId, state, content, width, buttons) {
    xDialog = new mDialog('modalPopup_' + dialogId);
    if (buttons == null || buttons == undefined)
        buttons = [{ text: 'Ok', click: dialogButton.Close }];
    xDialog.show('', content, dialogMode.Popup, state, buttons, width);
}

function showAlert(state, content) {
    var type = 'alert';
    switch (state) {
        case dialogState.Information:
            break;
        case dialogState.Warning:
            type = 'warning';
            break;
        case dialogState.Error:
            type = 'error';
            break;
        case dialogState.Success:
            type = 'success';
            break;
        default:
            break;
    }

    var options = {
        text: content,
        killer: false,
        type: type,
        theme: 'relax',
        layout: 'topRight',
        timeout: 25000,
        animation: {
            open: 'animated lightSpeedIn', // Animate.css class names
            close: 'animated lightSpeedOut', // Animate.css class names
        }
    };
    var n = noty(options);
}

function confirmDelete(id, deleteAction, grid, message) {
    if (message == undefined || message == null || message == '')
        message = 'Confirma exclusão permanente do registro?';

    xDialog = new mDialog('modalDialog1');
    xDialog.show('', message, dialogMode.Popup, dialogState.Warning,
        [
            {
                text: 'Excluir',
                click: function () {
                    $.ajax({
                        url: deleteAction,
                        data: { id: id },
                        type: 'POST',
                        success: function (data) {
                            if (data.success) {
                                xDialog.hide();
                                grid.load();
                                showAlert(dialogState.Success, data.message);
                            } else {
                                showAlert(dialogState.Error, data.message);
                            }
                        },
                        error: function (error) {
                            showAlert(dialogState.Error, data.message);
                        }
                    });
                }
            },
            { text: 'Cancelar', click: dialogButton.Close }
        ]
    );
}

// Enumerador dos Modos de caixa de diálogo
//var dialogMode = {
//    Ribbon: 0,
//    Warning: 1,
//    Error: 2,
//    LeftSidebar: 3,
//    RightSidebar: 4,
//    Popup: 5
//};
var dialogMode = {
    Ribbon: 0,
    LeftSidebar: 1,
    RightSidebar: 2,
    Popup: 3
};

var dialogState = {
    Information: 0,
    Warning: 1,
    Error: 2,
    Success: 3
};

var dialogButton = {
    Close: 0,
    CloseReloadGrid: 1
}

function showDialogDemo(mode) {
    mode == null ? dialogMode.Popup : mode;
    xDialog = new mDialog("modalDialog1");
    xDialog.show('Título', '<p>Conteúdo:</p><p>Pode conter qualquer conteúdo HTML, inclusive controles que serão utilizados nos métodos dos botões</p>', mode, dialogState.Information, [{ text: 'Ok', click: dialogButton.Close }, { text: 'Próximo', click: function () { zDialog = new mDialog("modalDialog2"); zDialog.show('titulo', 'conteudo', dialogMode.Popup, dialogState.Error, [{ text: 'Ok2', click: dialogButton.Close }]) } }], 500);
}