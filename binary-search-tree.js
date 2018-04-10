var node = {
	val: 0,
	left: null,
	right: null
};
function BinarySearchTree() {
	this._root = null;
}
BinarySearchTree.prototype = {
	constructor: BinarySearchTree,

	/*
	 *Добавляет некоторые данные в соответствующую точку дерева. Если нет
     * узлов в дереве, данные становятся корнем. Если есть другие узлы
     * в дереве, то дерево должно быть пройдено, чтобы найти правильное место
     * для вставки.
	 * @param {variant} value Данные для добавления в список.
     * @return {Void}
     * @method add
	*/
	add: function(val) {
		// создаем новый объект объекта, помещаем данные 
		var node = {
			 val: val,
			 left: null,
			 right: null
		},
		//используеться для прохода по структуре
		current;
		//в дереве тока нет елементов
		if( this._root === null){
			this._root = node;
		}else {
			current = this._root;
			While(true){
				//перемещение в лево если значение узла больше чем добавление значение значение 
				if(val < current.val){
					//если нет елемента по левой ссылке то элемент записываеться туда
					if(current.left === null){
						current.left = node;
						break;
					}else{
						current = current.left;
					}
					//перемещение в лево если значение узла меньше чем  добавление значение значение 
				}else if ( val > current.val){
					//если нет елемента по правой ссылке то элемент записываеться туда
					if(current.right === null){
						current.right = node;
						break;
					}else{
						current = current.right;
					}
				}else{
					break;
				}
			}
		}
	},
	/**
	* Определяет, присутствует ли данное значение в дереве.
	 *@param {variant} Значение для поиска.
     * @return {Boolean} Истинно, если значение найдено, false, если нет.
     * @method contains
	*/
	contains: function(val) {
		var found = false;
			current = this._root;
			// Проверкаа наличия элеиентов в дереве для поиска
			While(!found && current){
				// если значение меньше текущего узла, переход влево
				if( val < current.val){
					current = current.left;
				// если значение больще текущего узла, переход вправо
				} else if ( val > current.val) {
					current = current.right
				//значение найдено
				} else {
					 found = true;
				}
			}
			return found;
	},
	/**
     * Удаляет узел с заданным значением из дерева. Это может потребовать
     * перемещение  узлав, чтобы дерево двоичного поиска оставалось
     * сбалансированный.
     * @param {variant} value Значение для удаления.
     * @return {void}
     * @method remove
     */
	remove: function(val) {
		var found = false,
		parrent = null,
		current = this._root,
		childCount,
		replacement,
		replacementParent;
		// Проверкаа наличия элеиентов в дереве для поиска
		While(!found && current){
			// если значение меньше текущего узла, переход влево
			if( val < current.val){
				parrent = current;
				current = current.left;
			// если значение больще текущего узла, переход вправо
			}else if (val > current.val){
				parrent = current;
				current = current.right;
			//значение найдено
			}else{
				found = true;
			}
		}
		if(found){
			// поиск количества детей
			childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
			//special case: значение находится в корне
			if(current === this._root){
				switch(childCount){
					//нет потомков удаление корневого узла
					case 0:
					this._root = null;
					break;
					//один ребенок, перемещение его в корень
					case 1:
					this._root = (current.right === null ? current.left : current.right);
					break;

					case 2:
					replacement = this._root.left;

					While(replacement.right !== null){
						replacementParent = replacement;
						replacement = replacement.right;
					}
					if(replacementParent !== null){
						replacementParent.right = replacement.left;

						replacement.right = this._root.right;
						replacement.left = this._root.left;
					} else {
						replacement.right = this._root.right;
					}
				} else {
					switch (childCount) {
						case 0:
						if(current.val < parrent.val){
							parrent.left = null;
						} else {
							parrent.right = null;
						}
						break;
						case 1:
						// если значение меньше текущего узла, переход  к левому указателю
						if(current.val < parrent.val){
							parrent.left = (current.left === null ? current.right : current.left);
						// если значение больше текущего узла, переход  к правому указателю
						}else{
							parrent.right = (current.left === null ? current.right : current.left);
						}
						break;
						case 2:
						replacement = current.left;
						replacementParent = current;
						//поиск самого правого элемента
						While(replacement.right !== null){
							replacementParent = replacement;
							replacement = replacement.right;
						}
						replacementParent.right = replacement.left;
						//присвоение детей замене
						replacement.right = current.right;
						replacement.left = current.left;
						// поместить замену в нужное место
						if(current.val < parrent.val){
							parrent.left = replacement;
						}else{
							parrent.right = replacement;
						}
						break;
					}

				}
			}
		}
	},
	/**
     * Возвращает количество элементов в дереве. Произодя обход
     * рл дереву.
     * @return {int} Количество элементов в дереве.
     * @method size
     */
	size: function() {
		var lenght = 0;

		this.traverse(function(node){lenght++;});

	},
	/**
     * Преобразует дерево в массив.
     * @return {Array} Массив, содержащий все данные в дереве.
     * @method toArray
     */
	toArray: function() {
		var res = [];
		this.traverse(function(node){res.push(node.val);});
		return res;
	},
	/**
     * Преобразует массив в строковое представление.
     * @return {String} Строковое представление массива.
     * @method toString
     */
	toString: function() {return this.toArray().toString;},
	/**
     * Рекурсивный метод поиска минимального значения.
     * @return {} Минимальное значение  в дереве.
     * @method getMinvalue
     */
	getMinvalue: function() {
		if(!this.left){
			return this.left.val;
		}else{
			this.left.getMinvalue();
		}
	},
	/**
     * Рекурсивный метод поиска Максимального значения.
     * @return {} Максимальное значение  в дереве.
     * @method getMinvalue
     */
	getMaxvalue: function() {
		if(!this.right){
			return this.right.val;
		}else{
			this.right.getMaxvalue();
		}
	},
	/**
     * Прохдит по дереву и запускает данный метод на каждом узле
     * делая  упорядоченный обход.
     * @param {Function} process Функция для запуска на каждом узле.
     * @return {void}
     * @method traverse
     */
	traverse: function(process){
		function inOder(node){
			if(node){
				//переход по левому поддереву
				if(node.left !== null){
					inOder(node.left);
				}
				//вызов метода process к данному узлу
				process.call(this, node);
				//переход по правому поддереву
				if(node.right !== null){
					inOder(node.right);
				}
			}
		}
		inOder(this._root);
	
};