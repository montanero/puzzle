describe('Puzzle', function () {

    describe('#init()', function () {

        let puzzle;

        beforeEach(function () {
            puzzle = new Puzzle();
        })


        it('result should have free field on top left', function () {
            puzzle.init()
            let field = puzzle.getField()
            assert.equal(field[0], null)
        });

        it(' should provide different value on each call', function () {
            puzzle.init()
            let field = puzzle.getField()
            puzzle.init()
            let field2 = puzzle.getField()
            assert.notDeepEqual(field, field2)
        });
    });


    describe('#init(array)', function () {

        let puzzle;

        beforeEach(function () {
            puzzle = new Puzzle();
        })

        it('call works', function () {
            puzzle.init([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        });


        it('argument must have empty field', function () {
            assert.throws(function () {
                puzzle.init([1, 16, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
            });
        });

        it('argument must contain all values', function () {
            assert.throws(function () {
                puzzle.init([null, 1, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
            });
        });

        it('argument must have correct number of fields', function () {
            assert.throws(function () {
                puzzle.init([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            });
        });

        it('argument must describe solvable puzzle', function () {
            assert.throws(function () {
                puzzle.init([null, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
            });
        });
    });

    describe('#moveTile()', function () {

        let puzzle;

        beforeEach(function () {
            puzzle = new Puzzle();
        });

        it('moves tile to the left', function () {
            puzzle.init([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            assert.deepEqual(puzzle.getField(), [1, null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })

        it('moves tile to the right', function () {
            puzzle.init([1, null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            assert.deepEqual(puzzle.getField(), [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })

        it('moves tile down', function () {
            puzzle.init([1, 2, 4, 3, null, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            assert.deepEqual(puzzle.getField(), [null, 2, 4, 3, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })

        it('moves tile up', function () {
            puzzle.init([null, 2, 4, 3, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            assert.deepEqual(puzzle.getField(), [1, 2, 4, 3, null, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })

        it('doesnt moves tile without free neighbour', function () {
            puzzle.init([null, 2, 1, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            assert.deepEqual(puzzle.getField(), [null, 2, 1, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })

        it('doesnt wrap move right', function () {
            puzzle.init([1, 2, 4, 3, null, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(3);
            assert.deepEqual(puzzle.getField(), [1, 2, 4, 3, null, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })
        it('doesnt wrap move left', function () {
            puzzle.init([1, 2, 3, null, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(4);
            assert.deepEqual(puzzle.getField(), [1, 2, 3, null, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        })
    });


    describe('#isSolved()', function () {
        let puzzle;

        beforeEach(function () {
            puzzle = new Puzzle();
        });

        it('returns false', function () {
            puzzle.init([1, null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            let solved = puzzle.isSolved();
            assert.isFalse(solved)
        })

        it('returns true', function () {
            puzzle.init([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            let solved = puzzle.isSolved();
            assert.isTrue(solved)
        })
    });

    describe('#showTileOnPos()', function () {

        let puzzle;

        beforeEach(function () {
            puzzle = new Puzzle();
            sinon.spy(puzzle, "showTileOnPos")
        });

        it('is called on move', function () {
            puzzle.init([null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
            puzzle.moveTile(1);
            puzzle.showTileOnPos.should.have.been.calledOnce
        });
    })
});
